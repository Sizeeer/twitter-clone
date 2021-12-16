import { useInfiniteQuery } from "react-query";
import { TweetApi } from "../../../api/tweetApi";

export const useGetTweets = (days: number = 5) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isSuccess,
  } = useInfiniteQuery(
    "tweets",
    async ({ pageParam: offset = 0 }) => {
      const data = await TweetApi.getTweets(days, 10, offset);
      return data;
    },
    {
      retry: 1,
      //@ts-ignore
      getNextPageParam: (lastPage) => lastPage?.subscriptions?.nextOffset,
    }
  );

  return {
    data,
    isLoading,
    isError,
    error,
    getMoreTweets: fetchNextPage,
    hasTweets: hasNextPage,
    isSuccess,
  };
};
