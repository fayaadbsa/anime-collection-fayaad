import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
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
  const { title, coverImage, description, rankings, episodes, genres } = anime;
  const { extraLarge } = coverImage;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      }}
    >
      <AddAnimeModal open={open} handleClose={handleClose} anime={anime} />
      <div>
        {/* <img src={bannerImage} alt="banner" width={"100%"} /> */}
        <div
          css={{
            display: "flex",
            gap: 40,
          }}
        >
          <div
            css={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              gutterBottom
              variant="h3"
              sx={{ color: "primary.main" }}
            >
              {title.romaji}
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ color: "white" }}>
              Episodes: {episodes}
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ color: "white" }}>
              Genres: {genres.join(", ")}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="white"
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
          <div
            css={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <img src={extraLarge} alt="cover" width={"300px"} />
            </div>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                // width: "fit-content",
              }}
            >
              {rankings.length > 0 &&
                rankings.map(
                  (rank) =>
                    rank.allTime && (
                      <div
                        key={rank.id}
                        css={{
                          display: "flex",
                          alignItems: "center",
                          background: "white",
                          gap: 8,
                          padding: "8px 12px",
                          borderRadius: 8,
                        }}
                      >
                        {rank.type === "RATED" ? (
                          <StarRounded
                            sx={{
                              fontSize: 20,
                              color: "#f7bf63",
                            }}
                          />
                        ) : (
                          <FavoriteRounded
                            sx={{
                              fontSize: 20,
                              color: "#e85d75",
                            }}
                          />
                        )}
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "primary.main",
                            fontWeight: 300,
                          }}
                        >
                          {`#${rank.rank} ${capitalCase(rank.context)}`}
                        </Typography>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
