// GENERAL TYPES

export type TitleType = {
  romaji: string;
};

export type DateType = {
  year: number;
  month: number;
  day: number;
};

export type CoverImageType = {
  extraLarge: string;
};

export type RankingsType = {
  id: number;
  rank: number;
  type: string;
  allTime: boolean;
  context: string;
};

// SPECIFIC TYPES

export type AnimeDetailType = {
  id: number;
  title: TitleType;
  format: string;
  description: string;
  startDate: DateType;
  endDate: DateType;
  episodes: number;
  duration: number;
  status: string;
  coverImage: CoverImageType;
  bannerImage: string;
  genres: string[];
  averageScore: number;
  meanScore: number;
  rankings: RankingsType[];
};

export type AnimeCardType = {
  id: number;
  title: TitleType;
  description: string;
  coverImage: CoverImageType;
};

export type CollectionDetailType = {
  name: string;
  animes: AnimeCardType[];
};

export type CollectionsType = {
  [name: string]: CollectionDetailType;
};
