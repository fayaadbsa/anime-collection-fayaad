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

  // perlu sort by fav ?

  // const handleBookmark = (   isSaved: boolean,  collectionName: string  ) => {
  //   if (isSaved) {
  //     removeAnimeFromCollection(anime.id, collectionName);
  //     return;
  //   }
  //   addAnimeToCollection(anime, collectionName);
  // };

  const handleCloseForm = () => {
    handleClose();
  };

  return (
    <BaseModal open={open} onClose={handleCloseForm}>
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
          {collectionsFiltered.map((collection) => {
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
                {/* <IconButton
                  aria-label="bookmark"
                  sx={{
                    color: "primary.main",
                  }}
                  onClick={() =>
                    handleBookmark(collection.name, collection.isSaved)
                  }
                >
                  {collection.isSaved ? <Bookmark /> : <BookmarkBorder />}
                </IconButton> */}
                <Typography>{collection.name}</Typography>
              </div>
            );
          })}
        </div>
      </Box>
    </BaseModal>
  );
};

export default AddAnimeToCollectionModal;
