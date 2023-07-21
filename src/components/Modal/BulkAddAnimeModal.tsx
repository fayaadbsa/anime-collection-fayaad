import { useState } from "react";
import BaseModal from "./BaseModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAppStore from "@/store/useAppStore";
import { AnimeCardType } from "@/types";
import CollectionForm from "../Form/CollectionForm";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  animes: AnimeCardType[];
  handleSuccess: () => void;
};

const BulkAddAnimeModal = ({
  open,
  handleClose,
  animes,
  handleSuccess,
}: PropsType) => {
  const collections = useAppStore((state) => state.collections);
  const [hasCollection, setHasCollection] = useState(
    Object.keys(collections).length > 0
  );
  const collectionsFiltered = Object.values(collections).map((collection) => ({
    ...collection,
    isSaved: false,
    // isSaved: !!Object.values(collection.animes).find((a) => a?.id === anime.id),
  }));

  const bulkAddAnimeToCollection = useAppStore(
    (state) => state.bulkAddAnimeToCollection
  );

  const handleCreatedCollection = () => setHasCollection(true);

  const handleAdd = (collectionName: string) => {
    bulkAddAnimeToCollection(animes, collectionName);
    handleSuccess();
    handleClose();
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
            Select Target Collection
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
                <Typography
                  sx={{
                    justifyContent: "start",
                    color: "primary.main",
                  }}
                >
                  {collection.name}
                </Typography>
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

export default BulkAddAnimeModal;
