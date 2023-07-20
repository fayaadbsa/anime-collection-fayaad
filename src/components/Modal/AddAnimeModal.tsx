import { useState } from "react";
import BaseModal from "./BaseModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAppStore from "@/store/useAppStore";
import { AnimeCardType, CollectionsType } from "@/types";
import { Link } from "react-router-dom";
import CollectionForm from "../Form/CollectionForm";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  anime: AnimeCardType;
};

const AddAnimeModal = ({ open, handleClose, anime }: PropsType) => {
  const collections: CollectionsType = useAppStore(
    (state) => state.collections
  );
  const [hasCollection, setHasCollection] = useState(
    Object.keys(collections).length > 0
  );
  const collectionsFiltered = Object.values(collections).map((collection) => ({
    ...collection,
    isSaved: !!Object.values(collection.animes).find((a) => a?.id === anime.id),
  }));

  const addAnimeToCollection = useAppStore(
    (state) => state.addAnimeToCollection
  );

  const handleCreatedCollection = () => setHasCollection(true);

  const handleAdd = (collectionName: string) => {
    addAnimeToCollection(anime, collectionName);
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      {hasCollection ? (
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h6">
            Add To Collection
          </Typography>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {collectionsFiltered.map((collection) => (
              <div
                key={collection.name}
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link to={`/collection/${collection.name}`}>
                  <Typography
                    sx={{
                      justifyContent: "start",
                      textDecoration: "underline",
                      color: "primary.main",
                    }}
                  >
                    {collection.name}
                  </Typography>
                </Link>
                <Button
                  variant="contained"
                  disabled={collection.isSaved}
                  onClick={() => handleAdd(collection.name)}
                >
                  <Typography>
                    {collection.isSaved ? "Added" : "Add"}
                  </Typography>
                </Button>
              </div>
            ))}
          </div>
        </Box>
      ) : (
        <CollectionForm handleCreated={handleCreatedCollection} />
      )}
    </BaseModal>
  );
};

export default AddAnimeModal;
