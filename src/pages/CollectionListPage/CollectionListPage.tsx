import { useState } from "react";
import useAppStore from "@/store/useAppStore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateCollectionModal from "@/components/Modal/CreateCollectionModal";
import CollectionCard from "@/components/Card/CollectionCard";

const CollectionListPage = () => {
  const collections = useAppStore((state) => state.collections);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CreateCollectionModal open={open} handleClose={handleClose} />
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ color: "primary.main" }}
      >
        Collection List
      </Typography>
      <Button onClick={handleOpen}>New Collection</Button>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "32px",
          marginTop: "40px",
        }}
      >
        {Object.values(collections).map((collection) => {
          return (
            <CollectionCard key={collection.name} collection={collection} />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionListPage;
