import { useQuery } from "react-query";

import { TweetApi } from "../api/tweetApi";

export const useGetTweets = (days?: number) => {
  const { data, isLoading, isError, error } = useQuery("tweets", async () => {
    const data = await TweetApi.getTweets(days);
    return data;
  });

  return {
    likedTweets: data?.liked || [],
    personalTweets: data?.personal || [],
    subscriptionsTweets: data?.subscriptions || [],
    isLoading,
    isError,
    error,
  };
};
