import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AnimeCardType, CollectionsType } from "@/types";

type AppState = {
  collections: CollectionsType;
  createCollection: (collectionName: string) => void;
  updateCollection: (collectionName: string, collectionNameNew: string) => void;
  removeCollection: (collectionName: string) => void;
  addAnimeToCollection: (anime: AnimeCardType, collectionName: string) => void;
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
              ...state.collections,
              [collectionName]: {
                name: collectionName,
                animes: [],
              },
            },
          })),
        updateCollection: (collectionName, collectionNameNew) =>
          set((state) => {
            const collectionDetail = state.collections[collectionName];
            const newCollection = state.collections;
            delete newCollection[collectionName];
            newCollection[collectionNameNew] = collectionDetail;
            return {
              collections: { ...newCollection },
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
        removeAnimeFromCollection: (animeId, collectionName) =>
          set((state) => {
            const collection = state.collections[collectionName];
            const newAnimes = collection.animes.filter((a) => a.id !== animeId);
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
