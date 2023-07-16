import { gql, useQuery } from "@apollo/client";

var GET_ANIME_LIST = gql(`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
        id
        title {
          english
          romaji
          native
        }
        coverImage {
          large
        }
        bannerImage
      }
    }
  }
`);

type Anime = {};

const AnimeList = () => {
  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: {
      // search: "Fate/Zero",
      page: 1,
      // perPage: 3,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
  const { media, pageInfo } = data.Page;
  console.log(media);

  return media.map((anime) => {
    return <div key={anime?.id}>{anime.title.romaji}</div>;
  });

  return "";
  // return data.locations.map(({ id, name, description, photo }) => (
  //   <div key={id}>
  //     <h3>{name}</h3>
  //     <img width="400" height="250" alt="location-reference" src={`${photo}`} />
  //     <br />
  //     <b>About this location:</b>
  //     <p>{description}</p>
  //     <br />
  //   </div>
  // ));
};

const AnimeListPage = () => {
  return (
    <div>
      <br />
      <AnimeList />
      {/* <Dogs /> */}
      <br />
      {/* <DisplayLocations /> */}
    </div>
  );
};

export default AnimeListPage;
