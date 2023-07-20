import { useState } from "react";
import useAppStore from "@/store/useAppStore";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import AnimeCard from "@/components/Card/AnimeCard";
import { AnimeCardType } from "@/types";
import EditCollectionModal from "@/components/Modal/EditCollectionModal";

const CollectionDetailPage = () => {
  const collectionName = useParams()?.name || "";
  const collection = useAppStore((state) => state.collections)[collectionName];
  const navigate = useNavigate();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpen = () => setOpenModalEdit(true);
  const handleClose = () => {
    setOpenModalEdit(false);
  };

  const handleEdited = (name: string) => {
    setOpenModalEdit(false);
    navigate(`/collection/${name}`);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <EditCollectionModal
        open={openModalEdit}
        handleClose={handleClose}
        defaultValue={collection.name}
        handleEdited={handleEdited}
      />
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ color: "primary.main" }}
      >
        {collection.name}
      </Typography>
      <Button onClick={handleOpen}>Edit Collection</Button>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "32px",
          marginTop: "40px",
          justifyContent: "center",
        }}
      >
        {collection.animes.map((anime: AnimeCardType) => {
          return <AnimeCard anime={anime} collectionName={collectionName} />;
        })}
      </div>
    </div>
  );
};

export default CollectionDetailPage;
