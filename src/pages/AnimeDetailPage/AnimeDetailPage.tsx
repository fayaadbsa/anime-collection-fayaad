import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FavoriteRounded, StarRounded } from "@mui/icons-material";
import { capitalCase } from "change-case";
import { AnimeDetailType } from "@/types";

const GET_ANIME_DETAIL = gql(`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      format
      description(asHtml: false)
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      duration
      status
      coverImage {
        extraLarge
      }
      bannerImage
      genres
      averageScore
      meanScore
      tags {
        id
        name
        description
        category
        rank
      }
      studios {
        edges {
          id
          isMain
          node {
            id
            name
            isAnimationStudio
            isFavourite
          }
        }
        nodes {
          id
          name
          isAnimationStudio
          isFavourite
        }
        pageInfo {
          total
        }
      }
      rankings {
        id
        rank
        type
        allTime
        context
      }
    }
  }
`);

const AnimeDetailPage = () => {
  const animeId = useParams()?.id || "";

  const { loading, error, data } = useQuery(GET_ANIME_DETAIL, {
    variables: {
      id: parseInt(animeId),
    },
  });

  if (loading || error) return "";

  const anime: AnimeDetailType = data?.Media;
  const {
    id,
    title,
    bannerImage,
    coverImage,
    description,
    rankings,
    episodes,
    genres,
  } = anime;
  const { extraLarge } = coverImage;

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!loading && !error && (
        <div>
          {/* <img src={bannerImage} alt="banner" width={"100%"} /> */}
          <div
            css={{
              display: "flex",
              gap: 40,
            }}
          >
            <div>
              <Typography
                gutterBottom
                variant="h2"
                sx={{ color: "primary.main" }}
              >
                {title.romaji}
              </Typography>
              <Typography gutterBottom variant="h5" sx={{ color: "white" }}>
                Episodes: {episodes}
              </Typography>
              <Typography gutterBottom variant="h5" sx={{ color: "white" }}>
                Genres: {genres.join(", ")}
              </Typography>
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  width: "fit-content",
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
              <Typography variant="body2" color="white">
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Typography>
            </div>
            <img src={extraLarge} alt="cover" width={"300px"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailPage;
