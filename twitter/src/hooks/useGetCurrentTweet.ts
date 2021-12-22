import { UserAttributes } from "./../shared/types/userTypes";
import { useQuery } from "react-query";

import { TweetApi } from "./../api/tweetApi";

export const useGetCurrentTweet = (tweetId: string) => {
  const { data, isLoading, isError, error } = useQuery(
    ["tweet", tweetId],
    async () => {
      const data = await TweetApi.getCurrentTweet(tweetId);
      return data;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  return {
    currentTweet: data || null,
    isLoading,
    isError,
    error,
  };
};
