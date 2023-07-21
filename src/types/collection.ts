import { AnimeCardType } from "./anime";

export type CollectionDetailType = {
  name: string;
  animes: AnimeCardType[];
};

export type CollectionsType = {
  [name: string]: CollectionDetailType;
};
