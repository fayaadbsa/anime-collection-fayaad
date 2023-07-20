import React from "react";
import BaseModal from "./BaseModal";
import { useForm, Resolver } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAppStore from "@/store/useAppStore";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

type FormValues = {
  name: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

// must unique
// must not have special charac
// error

const AddCollectionModal = ({ open, handleClose }: PropsType) => {
  const collections = useAppStore((state) => state.collections);
  const updateCollection = useAppStore((state) => state.updateCollection);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    reset,
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => {
    if (!isAlphanumeric(data.name)) {
      setError("name", {
        type: "pattern",
        message: "Please don't use special character",
      });
      return;
    }
    if (isNameDuplicate(data.name)) {
      setError("name", {
        type: "validate",
        message: "Name must unique",
      });
      return;
    }

    updateCollection({
      name: data.name,
      animes: [],
    });
    reset();
    handleClose();
  });

  const isAlphanumeric = (name: string): boolean => {
    const regex = new RegExp(/^[a-z0-9]+$/i);
    return regex.test(name);
  };

  const isNameDuplicate = (name: string): boolean => {
    return !!Object.keys(collections).find((key) => key === name);
  };

  const handleCloseForm = () => {
    handleClose();
    clearErrors();
  };

  return (
    <BaseModal open={open} onClose={handleCloseForm}>
      <Box
        component="form"
        onSubmit={onSubmit}
        autoComplete="off"
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography gutterBottom variant="h6">
          Create New Collection
        </Typography>
        <TextField
          {...register("name", {
            pattern: /[A]/,
            // pattern: {
            //   // value: /[^a-zA-Z0-9 ]/g,
            //   value: /[^1-9]/g,
            //   message: "Please don't use special character",
            // },
          })}
          variant="outlined"
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </BaseModal>
  );
};

export default AddCollectionModal;
