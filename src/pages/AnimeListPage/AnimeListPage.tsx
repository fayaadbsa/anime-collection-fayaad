import AnimeCard from "@/components/Card/AnimeCard";
import { AnimeCardType } from "@/types";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BulkAddAnimeModal from "@/components/Modal/BulkAddAnimeModal";
import { GET_ANIME_LIST } from "@/graphql/queries";
import { GetAnimeListData, GetAnimeListVariables } from "@/graphql/types";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const AnimeListPage = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(500);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [selectable, setSelectable] = useState(false);
  const [selected, setSelected] = useState<AnimeCardType[]>([]);
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery<
    GetAnimeListData,
    GetAnimeListVariables
  >(GET_ANIME_LIST, {
    variables: {
      page: page,
      perPage: 10,
    },
  });

  const animes = data?.Page?.media || [];

  useEffect(() => {
    if (data) {
      setTotalPage(data.Page.pageInfo.lastPage);
    }
  }, [data]);

  const handlePageChage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = () => {
    setSelectable(true);
  };

  const handleSelected = (anime: AnimeCardType, isSelected: boolean) => {
    if (isSelected) {
      setSelected([...selected.filter((a) => a.id !== anime.id)]);
      return;
    }
    setSelected([...selected, anime]);
  };

  const handleReset = () => {
    setSelected([]);
    setSelectable(false);
  };

  console.log(selected);

  const checkSelected = (animeId: number) => {
    return !!selected.find((anime) => anime.id === animeId);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BulkAddAnimeModal
        open={open}
        handleClose={handleClose}
        animes={selected}
        handleSuccess={handleReset}
      />
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ color: "primary.main", fontWeight: 700 }}
      >
        Popular Anime
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignSelf: { xs: "start", sm: "end" },
        }}
      >
        {selectable ? (
          <>
            <Button variant="outlined" onClick={handleReset}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleOpen}
              color="primary"
              disabled={selected.length === 0}
            >
              Add To Collection
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleSelect}>
            Bulk Add To Collection
          </Button>
        )}
      </Box>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          minHeight: "760px",
          width: "100%",
        }}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error.message} />
        ) : (
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(212px, 1fr))",
              width: "100%",
              gap: "32px",
              marginTop: "40px",
            }}
          >
            {animes.map((anime: AnimeCardType) => {
              return (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  selectable={selectable}
                  handleSelected={handleSelected}
                  defaultSelected={checkSelected(anime.id)}
                />
              );
            })}
          </div>
        )}
      </div>
      <div
        css={{
          margin: "40px 0",
          backgroundColor: "#1A1C22",
          padding: 16,
          borderRadius: 96,
        }}
      >
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
            },
          }}
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
