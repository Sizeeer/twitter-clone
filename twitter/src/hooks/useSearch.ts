import { SearchApi } from "./../api/searchApi";
import { useQuery } from "react-query";

export const useSearch = (searchQuery: string) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery(
    "searchData",
    async () => {
      const data = await SearchApi.getSearchData(searchQuery, 4);
      return data;
    },
    {
      retry: 1,
      enabled: !!searchQuery,
    }
  );

  return {
    searchData: data,
    isLoading: isLoading || isRefetching,
    isError,
    error,
    refetch,
  };
};
