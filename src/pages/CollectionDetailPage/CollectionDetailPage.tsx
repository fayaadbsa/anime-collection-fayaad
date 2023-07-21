import { useState } from "react";
import useAppStore from "@/store/useAppStore";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import AnimeCard from "@/components/Card/AnimeCard";
import EditCollectionModal from "@/components/Modal/EditCollectionModal";
import Box from "@mui/material/Box";

const CollectionDetailPage = () => {
  const params = useParams();
  const collectionName = params.name || "";
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
        paddingBottom: "40px",
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
        sx={{ color: "primary.main", fontWeight: 700 }}
      >
        {collection.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignSelf: { xs: "start", sm: "end" },
        }}
      >
        <Button variant="contained" onClick={handleOpen}>
          Edit Collection
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
        {collection.animes.map((anime) => {
          return (
            <AnimeCard
              key={anime.id}
              anime={anime}
              collectionName={collectionName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionDetailPage;
