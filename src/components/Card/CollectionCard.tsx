import { CollectionDetailType } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

type PropsType = {
  collection: CollectionDetailType;
};

const CollectionCard = ({ collection }: PropsType) => {
  const { name, animes } = collection;

  return (
    <Card key={name} css={{ maxWidth: 400 }}>
      <Link to={`/collection/${name}`}>
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
            image={
              Object.keys(animes).length > 0
                ? animes[0].coverImage.extraLarge
                : "src/images/placeholder.jpg"
            }
            alt={"Collection cover image"}
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
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default CollectionCard;
