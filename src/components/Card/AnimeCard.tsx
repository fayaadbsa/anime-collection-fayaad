import { AnimeCardType } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type Props = {
  anime: AnimeCardType;
};

const AnimeCard = ({ anime }: Props) => {
  const { id, title, bannerImage, coverImage, description } = anime;
  const { romaji } = title;
  const { extraLarge } = coverImage;

  return (
    <Card key={id} css={{ maxWidth: 400 }}>
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
          <Typography gutterBottom variant="h5" component="div">
            {romaji}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            css={{
              maxWidth: "100%",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;
