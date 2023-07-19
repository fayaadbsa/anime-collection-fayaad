import React from "react";
import BaseModal from "./BaseModal";
import Typography from "@mui/material/Typography";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

const AddCollectionModal = ({ open, handleClose }: PropsType) => {
  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </BaseModal>
  );
};

export default AddCollectionModal;
