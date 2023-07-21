import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql(`
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

export const GET_ANIME_DETAIL = gql(`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      format
      description(asHtml: false)
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      duration
      status
      coverImage {
        extraLarge
      }
      bannerImage
      genres
      averageScore
      meanScore
      tags {
        id
        name
        description
        category
        rank
      }
      studios {
        edges {
          id
          isMain
          node {
            id
            name
            isAnimationStudio
            isFavourite
          }
        }
        nodes {
          id
          name
          isAnimationStudio
          isFavourite
        }
        pageInfo {
          total
        }
      }
      rankings {
        id
        rank
        type
        allTime
        context
      }
    }
  }
`);
