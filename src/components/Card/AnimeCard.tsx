import { useState } from "react";
import { AnimeCardType } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveAnimeModal from "../Modal/RemoveAnimeModal";

type PropsType = {
  anime: AnimeCardType;
  collectionName?: string;
  selectable?: boolean;
  handleSelected?: (props: AnimeCardType, isSelected: boolean) => void;
  defaultSelected?: boolean;
};

const AnimeCard = ({
  anime,
  collectionName = "",
  selectable = false,
  handleSelected,
  defaultSelected = false,
}: PropsType) => {
  const [openModalRemove, setOpenModalRemove] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const [hover, setHover] = useState(false);

  const { id, title, coverImage } = anime;
  const { romaji } = title;
  const { extraLarge } = coverImage;

  return (
    <Card
      key={id}
      sx={{
        maxHeight: 400,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {collectionName && (
        <RemoveAnimeModal
          open={openModalRemove}
          handleClose={() => setOpenModalRemove(false)}
          anime={anime}
          collectionName={collectionName}
        />
      )}
      <Link to={selectable ? "#" : `/anime/${id}`}>
        <CardActionArea
          onClick={() => {
            if (!selectable) {
              return;
            }
            handleSelected && handleSelected(anime, selected);
            setSelected(!selected);
          }}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          sx={{
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            height="282"
            css={{ minHeight: 282 }}
            image={extraLarge}
            alt={`${romaji} cover image`}
          />
          <CardContent
            sx={{
              background: "#1A1C22",
              height: "100%",
              paddingBottom: selectable || collectionName ? "0px" : "16px",
            }}
          >
            <Typography
              gutterBottom
              variant="body1"
              sx={{
                color: hover ? "primary.main" : "white",
                maxWidth: "100%",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {romaji}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {collectionName && (
        <CardActions
          sx={{
            alignSelf: "end",
          }}
        >
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setOpenModalRemove(true)}
          >
            Remove
          </Button>
        </CardActions>
      )}
      {selectable && (
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color={selected ? "error" : "primary"}
            onClick={() => {
              handleSelected && handleSelected(anime, selected);
              setSelected(!selected);
            }}
          >
            {selected ? "Selected" : "Select"}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default AnimeCard;
