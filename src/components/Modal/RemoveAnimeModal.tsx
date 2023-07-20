import BaseModal from "./BaseModal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAppStore from "@/store/useAppStore";
import { AnimeCardType } from "@/types";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  anime: AnimeCardType;
  collectionName: string;
};

const RemoveAnimeModal = ({
  open,
  handleClose,
  anime,
  collectionName,
}: PropsType) => {
  const removeAnimeFromCollection = useAppStore(
    (state) => state.removeAnimeFromCollection
  );

  const handleRemove = () => {
    removeAnimeFromCollection(anime.id, collectionName);
    handleClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <Typography variant="h6" component="h2">
        Remove Anime From Collection
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Are you sure want to remove{" "}
        <span css={{ fontWeight: 700 }}>{anime.title.romaji}</span> from
        collection <span css={{ fontWeight: 700 }}>{collectionName}</span>?
      </Typography>
      <div
        css={{
          display: "flex",
          justifyContent: "end",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <Button variant="outlined" onClick={handleRemove} color="error">
          Remove
        </Button>
        <Button variant="contained" onClick={handleClose} color="error">
          Cancel
        </Button>
      </div>
    </BaseModal>
  );
};

export default RemoveAnimeModal;
