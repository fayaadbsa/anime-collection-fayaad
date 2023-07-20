import BaseModal from "./BaseModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAppStore from "@/store/useAppStore";

type PropsType = {
  name: string;
  open: boolean;
  handleClose: () => void;
};

const RemoveCollectionModal = ({ open, handleClose, name }: PropsType) => {
  const removeCollection = useAppStore((state) => state.removeCollection);

  const handleRemove = () => {
    removeCollection(name);
    handleClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h2">
        Remove Collection
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Are you sure want to remove collection{" "}
        <span css={{ fontWeight: 700 }}>{name}</span> ?
      </Typography>
      <div
        css={{
          display: "flex",
          justifyContent: "end",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <Button variant="outlined" onClick={handleRemove} color="error">
          Remove
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
      </div>
    </BaseModal>
  );
};

export default RemoveCollectionModal;
