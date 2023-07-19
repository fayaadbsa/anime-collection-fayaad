import { useState } from "react";
import useAppStore from "@/store/useAppStore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCollectionModal from "@/components/Modal/AddCollectionModal";

const CollectionListPage = () => {
  const [open, setOpen] = useState(false);
  const collections = useAppStore((state) => state.collections);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(collections);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ color: "primary.main" }}
      >
        Collection List
      </Typography>
      <Button onClick={handleOpen}>New Collection</Button>
      <AddCollectionModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default CollectionListPage;
