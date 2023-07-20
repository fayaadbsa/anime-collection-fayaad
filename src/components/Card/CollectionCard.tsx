import { useState } from "react";
import { CollectionDetailType } from "@/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveCollectionModal from "../Modal/RemoveCollectionModal";
import EditCollectionModal from "../Modal/EditCollectionModal";

type PropsType = {
  collection: CollectionDetailType;
};

const CollectionCard = ({ collection }: PropsType) => {
  const { name, animes } = collection;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalRemove, setOpenModalRemove] = useState(false);

  return (
    <Card key={name} css={{ maxWidth: 400 }}>
      <EditCollectionModal
        open={openModalEdit}
        handleClose={() => setOpenModalEdit(false)}
        defaultValue={collection.name}
      />
      <RemoveCollectionModal
        open={openModalRemove}
        handleClose={() => setOpenModalRemove(false)}
        name={collection.name}
      />
      <Link to={`/collection/${name}`}>
        <CardActionArea>
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
            <Typography
              gutterBottom
              variant="h5"
              sx={{ wordBreak: "break-all" }}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => setOpenModalRemove(true)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
