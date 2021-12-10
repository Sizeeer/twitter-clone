import { useQuery } from "react-query";

import { TweetApi } from "../api/tweetApi";

export const useGetTweet = (tweetId: string) => {
  const { data, isLoading, isError, error } = useQuery(
    "currentTweet",
    async () => {
      const data = await TweetApi.getCurrentTweet(tweetId);
      return data;
    }
  );

  return {
    tweet: data,
    isLoading,
    isError,
    error,
  };
};
