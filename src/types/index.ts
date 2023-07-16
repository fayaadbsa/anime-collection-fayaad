export type TitleType = {
  english: string;
  romaji: string;
  native: string;
};

export type CoverImageType = {
  extraLarge: string;
};

export type AnimeCardType = {
  id: number;
  title: TitleType;
  bannerImage: string;
  coverImage: CoverImageType;
  description: string;
};
// export type AnimeDetailType = {};
