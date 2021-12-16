import { useQuery } from "react-query";
import { RecommendationApi } from "../../../../api/recommendationApi";
export const useGetTopics = (limit: number) => {
  const { data, isLoading, isError } = useQuery(
    "recommendationTopics",
    async () => {
      return RecommendationApi.getTopics(limit);
    },
    { retry: 1 }
  );

  return {
    topics: data || [],
    isLoading,
    isError,
  };
};
