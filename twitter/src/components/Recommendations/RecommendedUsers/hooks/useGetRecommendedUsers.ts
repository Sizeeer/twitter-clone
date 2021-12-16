import { RecommendationApi } from "../../../../api/recommendationApi";
import { useQuery } from "react-query";
export const useGetRecommendedUsers = (limit: number) => {
  const { data, isLoading, isError } = useQuery(
    "recommendedUsers",
    async () => {
      return RecommendationApi.getPeople(limit);
    },
    { retry: 1, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  return {
    recommendedUsers: data || [],
    isLoading,
    isError,
  };
};
