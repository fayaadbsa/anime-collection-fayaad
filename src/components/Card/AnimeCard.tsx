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

// add max height
// add skeleton
// remove desc, show other info

const AnimeCard = ({
  anime,
  collectionName = "",
  selectable = false,
  handleSelected,
  defaultSelected = false,
}: PropsType) => {
  const [openModalRemove, setOpenModalRemove] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const { id, title, coverImage, description } = anime;
  const { romaji } = title;
  const { extraLarge } = coverImage;

  return (
    <Card
      key={id}
      sx={{
        maxWidth: 400,
        backgroundColor: "transparent",
        // ...(collectionName && {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // }),
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
      <Link
        to={selectable ? "#" : `/anime/${id}`}
        css={{
          height: "100%",
        }}
      >
        <CardActionArea
          sx={{
            // display: "flex",
            // flexDirection: "column",
            height: "100%",
            // ":hover": {
            //   // color: "red",
            // },
          }}
        >
          <CardMedia
            component="img"
            height="300"
            css={{ minHeight: 300 }}
            image={extraLarge}
            alt={`${romaji} cover image`}
          />
          <CardContent
            sx={{
              background: "white",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "space-between",
              height: "100%",
              // width: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                // color: "primary.main",
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
            {/* <Typography
              variant="body2"
              component={"div"}
              color="text.secondary"
              css={{
                maxWidth: "100%",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            /> */}
          </CardContent>
        </CardActionArea>
      </Link>
      {collectionName && (
        <CardActions
          sx={{
            display: "flex",
            // justifyContent: "end",
          }}
        >
          <Button
            size="small"
            color="error"
            // variant="contained"
            onClick={() => setOpenModalRemove(true)}
          >
            Remove
          </Button>
        </CardActions>
      )}
      {selectable && (
        <CardActions
          sx={{
            display: "flex",
            // justifyContent: "end",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            color={selected ? "error" : "primary"}
            // disabled={selected}
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
