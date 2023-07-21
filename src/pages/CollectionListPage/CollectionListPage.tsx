import { useState } from "react";
import useAppStore from "@/store/useAppStore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateCollectionModal from "@/components/Modal/CreateCollectionModal";
import CollectionCard from "@/components/Card/CollectionCard";
import Box from "@mui/material/Box";

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
        paddingBottom: "40px",
      }}
    >
      <CreateCollectionModal open={open} handleClose={handleClose} />
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ color: "primary.main", fontWeight: 700 }}
      >
        Collections
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignSelf: { xs: "start", sm: "end" },
        }}
      >
        <Button variant="contained" onClick={handleOpen}>
          New Collection
        </Button>
      </Box>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(212px, 1fr))",
          width: "100%",
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
