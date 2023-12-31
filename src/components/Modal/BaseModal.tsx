import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

type PropsType = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const BaseModal = ({ children, open = false, onClose }: PropsType) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 240, sm: 400 },
            borderRadius: "8px",
            bgcolor: "#2D2F34",
            boxShadow: 24,
            p: { xs: "24px", sm: "32px" },
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default BaseModal;
