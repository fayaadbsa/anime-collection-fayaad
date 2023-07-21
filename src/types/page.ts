import { AnimeCardType } from "./anime";

export type PageInfoType = {
  currentPage: number;
  hasNextPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type PageType = {
  media: AnimeCardType[];
  pageInfo: PageInfoType;
};
