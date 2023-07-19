import AnimeCard from "@/components/Card/AnimeCard";
import { AnimeCardType } from "@/types";
import { gql, useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const GET_ANIME_LIST = gql(`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
        bannerImage
        description(asHtml: false)
      }
    }
  }
`);

const AnimeListPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(500);

  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: {
      page: page,
      perPage: 10,
    },
  });

  useEffect(() => {
    if (loading || error || !data) {
      return;
    }
    setTotalPage(data?.Page?.pageInfo.lastPage);
  }, [data]);

  const handlePageChage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ color: "primary.main" }}
      >
        Anime List
      </Typography>
      <div
        css={{
          minHeight: "1028px",
        }}
      >
        {!loading && !error && (
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "32px",
              marginTop: "40px",
            }}
          >
            {data.Page.media.map((anime: AnimeCardType) => {
              return <AnimeCard anime={anime} />;
            })}
          </div>
        )}
      </div>
      <div
        css={{
          marginTop: 40,
          backgroundColor: "whitesmoke",
          padding: 16,
          borderRadius: 96,
        }}
      >
        <Pagination
          count={totalPage}
          color="primary"
          size={!matches ? "small" : "large"}
          onChange={handlePageChage}
        />
      </div>
    </div>
  );
};

export default AnimeListPage;
