import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import AnimeDetail from "./AnimeDetail";
import { GET_ANIME_DETAIL } from "@/graphql/queries";
import { GetAnimeDetailData, GetAnimeDetailVariables } from "@/graphql/types";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const AnimeDetailPage = () => {
  const params = useParams();
  const animeId = params.id || "";

  const {
    loading,
    error, 
    data
  } = useQuery<GetAnimeDetailData, GetAnimeDetailVariables>(GET_ANIME_DETAIL, {
    variables: {
      id: parseInt(animeId),
    },
  });

  if (loading) return <Loading />;
  if (error)
    return <Error error={error.message} />;

  return data && <AnimeDetail anime={data.Media} />;
};

export default AnimeDetailPage;
