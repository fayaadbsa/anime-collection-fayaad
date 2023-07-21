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

const PLACEHOLDER_IMAGE =
  "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg";

const CollectionCard = ({ collection }: PropsType) => {
  const { name, animes } = collection;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalRemove, setOpenModalRemove] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <Card
      key={name}
      sx={{
        maxHeight: 400,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
        <CardActionArea
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
            image={
              Object.keys(animes).length > 0
                ? animes[0].coverImage.extraLarge
                : PLACEHOLDER_IMAGE
            }
            alt={"Collection cover image"}
          />
          <CardContent
            css={{
              background: "#1A1C22",
              height: "100%",
              paddingBottom: "0px",
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
                wordBreak: "break-all",
              }}
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
          variant="outlined"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => setOpenModalRemove(true)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
