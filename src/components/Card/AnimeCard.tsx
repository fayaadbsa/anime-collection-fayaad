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
};

// add max height
// add skeleton
// remove desc, show other info

const AnimeCard = ({ anime, collectionName = "" }: PropsType) => {
  const [openModalRemove, setOpenModalRemove] = useState(false);

  const { id, title, coverImage, description } = anime;
  const { romaji } = title;
  const { extraLarge } = coverImage;

  return (
    <Card
      key={id}
      css={{
        maxWidth: 400,
        ...(collectionName && {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }),
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
        to={`/anime/${id}`}
        css={{
          height: "100%",
        }}
      >
        <CardActionArea
          css={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
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
            css={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Typography gutterBottom variant="h5">
              {romaji}
            </Typography>
            <Typography
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
            />
          </CardContent>
        </CardActionArea>
      </Link>
      {collectionName && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            size="small"
            color="error"
            onClick={() => setOpenModalRemove(true)}
          >
            Remove
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default AnimeCard;
