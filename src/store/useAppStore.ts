import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AnimeCardType, CollectionsType } from "@/types";

type AppState = {
  collections: CollectionsType;
  createCollection: (collectionName: string) => void;
  editCollection: (collectionName: string, collectionNameNew: string) => void;
  removeCollection: (collectionName: string) => void;
  addAnimeToCollection: (anime: AnimeCardType, collectionName: string) => void;
  bulkAddAnimeToCollection: (
    animes: AnimeCardType[],
    collectionName: string
  ) => void;
  removeAnimeFromCollection: (animeId: number, collectionName: string) => void;
};

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        collections: {},
        createCollection: (collectionName) =>
          set((state) => ({
            collections: {
              [collectionName]: {
                name: collectionName,
                animes: [],
              },
              ...state.collections,
            },
          })),
        editCollection: (collectionName, collectionNameNew) =>
          set((state) => {
            const collectionDetail = state.collections[collectionName];
            const newCollection = state.collections;
            delete newCollection[collectionName];
            return {
              collections: {
                [collectionNameNew]: {
                  ...collectionDetail,
                  name: collectionNameNew,
                },
                ...newCollection,
              },
            };
          }),
        removeCollection: (collectionName) =>
          set((state) => {
            const newCollection = state.collections;
            delete newCollection[collectionName];
            return {
              collections: { ...newCollection },
            };
          }),
        addAnimeToCollection: (anime, collectionName) =>
          set((state) => {
            const collection = state.collections[collectionName];
            collection.animes.push({
              id: anime.id,
              title: anime.title,
              description: anime.description,
              coverImage: anime.coverImage,
            });
            return {
              collections: {
                ...state.collections,
                [collectionName]: collection,
              },
            };
          }),
        bulkAddAnimeToCollection: (animes, collectionName) =>
          set((state) => {
            const collection = state.collections[collectionName];
            const newAnimes = animes.map((anime) => ({
              id: anime.id,
              title: anime.title,
              description: anime.description,
              coverImage: anime.coverImage,
            }));
            const animeIds = new Set(
              collection.animes.map((anime) => anime.id)
            );
            const mergedAnimes = [
              ...collection.animes,
              ...newAnimes.filter((anime) => !animeIds.has(anime.id)),
            ];
            collection.animes = mergedAnimes;
            return {
              collections: {
                ...state.collections,
                [collectionName]: collection,
              },
            };
          }),
        removeAnimeFromCollection: (animeId, collectionName) =>
          set((state) => {
            const collection = state.collections[collectionName];
            const newAnimes = collection.animes.filter(
              (anime) => anime.id !== animeId
            );
            return {
              collections: {
                ...state.collections,
                [collectionName]: { ...collection, animes: newAnimes },
              },
            };
          }),
      }),
      {
        name: "app-storage",
      }
    )
  )
);

export default useAppStore;
