import { AnimeDetailType, PageType } from "@/types";

export type GetAnimeListData = {
  Page: PageType;
};

export type GetAnimeListVariables = {
  page: number;
  perPage: number;
};

export type GetAnimeDetailData = {
  Media: AnimeDetailType;
};

export type GetAnimeDetailVariables = {
  id: number;
};
