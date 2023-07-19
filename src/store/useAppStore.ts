import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AnimeCardType, CollectionDetailType, CollectionsType } from "@/types";

type AppState = {
  collections: CollectionsType;
  updateCollection: (collectionDetail: CollectionDetailType) => void;
  removeCollection: (collectionName: string) => void;
  addAnimeToCollection: (anime: AnimeCardType, collectionName: string) => void;
  removeAnimeFromCollection: (animeId: number, collectionName: string) => void;
};

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        collections: {},
        updateCollection: (collectionDetail) =>
          set((state) => ({
            collections: {
              ...state.collections,
              [collectionDetail.name]: collectionDetail,
            },
          })),
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
            collection.animes[anime.id] = anime;
            return {
              collections: {
                ...state.collections,
                collectionName: collection,
              },
            };
          }),
        removeAnimeFromCollection: (animeId, collectionName) =>
          set((state) => {
            const collection = state.collections[collectionName];
            delete collection.animes[animeId];
            return {
              collections: {
                ...state.collections,
                collectionName: collection,
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
