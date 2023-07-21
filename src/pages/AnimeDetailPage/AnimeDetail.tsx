import { useEffect, useState } from "react";
import { Button, Typography, Chip } from "@mui/material";
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  FavoriteRounded,
  StarRounded,
} from "@mui/icons-material";
import { capitalCase } from "change-case";
import { AnimeDetailType } from "@/types";
import AddAnimeModal from "@/components/Modal/AddAnimeModal";
import useAppStore from "@/store/useAppStore";

type PropsType = {
  anime: AnimeDetailType;
};

const AnimeDetail = ({ anime }: PropsType) => {
  const {
    title,
    coverImage,
    description,
    rankings,
    episodes,
    genres,
    averageScore,
    startDate,
  } = anime;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ranksAllTimeRated = rankings.find(
    (rank) => rank.allTime && rank.type === "RATED"
  );

  const collections = useAppStore((state) => state.collections);
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    const isCollected = !!Object.values(collections).find(
      (collection) => !!collection.animes.find((a) => a.id === anime.id)
    );
    setIsCollected(isCollected);
  }, [collections]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <AddAnimeModal open={open} handleClose={handleClose} anime={anime} />
      <div
        css={{
          display: "flex",
          // justifyContent: "space-between",
          width: "100%",
          gap: 40,
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={coverImage.extraLarge} alt="cover" width={"300px"} />
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography
            gutterBottom
            variant="h1"
            sx={{
              fontSize: "40px",
              lineHeight: "1.2",
              fontWeight: 800,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title.romaji}
          </Typography>
          <div>
            {ranksAllTimeRated && (
              <>
                <Chip
                  size="small"
                  label={`Top ${ranksAllTimeRated?.rank}`}
                  color="info"
                  sx={{
                    borderRadius: "4px 0 0 4px",
                    backgroundColor: "#00c235",
                    fontWeight: "700",
                  }}
                />
                <Chip
                  size="small"
                  label={capitalCase(ranksAllTimeRated?.context)}
                  color="info"
                  sx={{ borderRadius: "0 4px 4px 0" }}
                />
              </>
            )}
          </div>
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div css={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <StarRounded sx={{ fontSize: "20px", color: "primary.main" }} />
              <Typography sx={{ color: "primary.main", fontWeight: "500" }}>
                {averageScore / 10}
              </Typography>
            </div>
            <Typography sx={{ color: "info.light" }}>|</Typography>
            <Typography>{startDate.year}</Typography>
            <Typography sx={{ color: "info.light" }}>|</Typography>
            <Typography>
              {episodes > 1 ? `${episodes} Episodes` : `${episodes} Episode`}
            </Typography>
          </div>
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {genres.map((genre) => (
              <Chip
                key={genre}
                size="small"
                label={genre}
                color="info"
                sx={{ borderRadius: "4px" }}
              />
            ))}
          </div>
          <Typography
            sx={{
              marginTop: "16px",
              marginBottom: "40px",
              maxWidth: "800px",
            }}
            variant="body2"
            component="div"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div
            css={{
              display: "flex",
            }}
          >
            <Button
              onClick={handleOpen}
              sx={{ color: "white" }}
              variant="contained"
            >
              {isCollected ? (
                <BookmarkRounded
                  sx={{
                    fontSize: 20,
                    marginRight: "8px",
                  }}
                />
              ) : (
                <BookmarkBorderRounded
                  sx={{
                    fontSize: 20,
                    marginRight: "8px",
                  }}
                />
              )}
              <Typography variant="button">Add To Collection</Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
