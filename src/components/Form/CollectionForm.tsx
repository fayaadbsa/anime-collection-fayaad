import { useForm, Resolver } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAppStore from "@/store/useAppStore";

type PropsType = {
  handleCreated?: () => void;
  handleEdited?: (name: string) => void;
  defaultValue?: string;
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

const CollectionForm = ({
  handleCreated,
  defaultValue,
  handleEdited,
}: PropsType) => {
  const collections = useAppStore((state) => state.collections);
  const createCollection = useAppStore((state) => state.createCollection);
  const editCollection = useAppStore((state) => state.editCollection);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

    if (defaultValue) {
      editCollection(defaultValue, data.name);
      handleEdited && handleEdited(data.name);
      return;
    }

    createCollection(data.name);
    handleCreated && handleCreated();
    reset();
  });

  const isAlphanumeric = (name: string): boolean => {
    const regex = new RegExp(/^[a-z0-9]+$/i);
    return regex.test(name);
  };

  const isNameDuplicate = (name: string): boolean => {
    return !!Object.keys(collections).find((key) => key === name);
  };

  return (
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
        {...register("name")}
        defaultValue={defaultValue}
        variant="outlined"
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default CollectionForm;
