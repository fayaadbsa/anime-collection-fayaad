import { useState } from "react";
import BaseModal from "./BaseModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import useAppStore from "@/store/useAppStore";
import { AnimeCardType, CollectionsType } from "@/types";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CreateCollectionForm from "../Form/CreateCollectionForm";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  anime: AnimeCardType;
};

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

  const [hasCollection, setHasCollection] = useState(
    Object.keys(collections).length > 0
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
      ) : (
        <CreateCollectionForm
          handleCreated={() => {
            setHasCollection(true);
          }}
        />
      )}
    </BaseModal>
  );
};

export default AddAnimeToCollectionModal;
