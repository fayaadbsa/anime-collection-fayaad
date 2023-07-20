import React from "react";
import BaseModal from "./BaseModal";
import { useForm, Resolver } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import useAppStore from "@/store/useAppStore";
import { AnimeCardType, CollectionsType } from "@/types";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { Link } from "react-router-dom";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  anime: AnimeCardType;
};

// if no collection, create first
// sort by saved

const AddAnimeToCollectionModal = ({ open, handleClose, anime }: PropsType) => {
  const collections: CollectionsType = useAppStore(
    (state) => state.collections
  );
  const addAnimeToCollection = useAppStore(
    (state) => state.addAnimeToCollection
  );
  const removeAnimeFromCollection = useAppStore(
    (state) => state.removeAnimeFromCollection
  );

  const collectionsFiltered = Object.values(collections).map((collection) => ({
    ...collection,
    isSaved: !!Object.values(collection.animes).find((a) => a?.id === anime.id),
  }));

  const handleBookmark = (
    event: React.ChangeEvent<HTMLInputElement>,
    collectionName: string
  ) => {
    if (event.target.checked) {
      addAnimeToCollection(anime, collectionName);
      return;
    }
    removeAnimeFromCollection(anime.id, collectionName);
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Box
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography gutterBottom variant="h6">
          Add To Collection
        </Typography>
        <div>
          {collectionsFiltered.map((collection) => (
            <div
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={collection.isSaved}
                onChange={(event) => handleBookmark(event, collection.name)}
                icon={<BookmarkBorder />}
                checkedIcon={<Bookmark />}
                inputProps={{ "aria-label": "bookmark" }}
              />
              <Link
                to={`/collection/${collection.name}`}
                css={{ width: "100%" }}
              >
                <Button
                  fullWidth
                  sx={{
                    justifyContent: "start",
                  }}
                >
                  <Typography>{collection.name}</Typography>
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Box>
    </BaseModal>
  );
};

export default AddAnimeToCollectionModal;
