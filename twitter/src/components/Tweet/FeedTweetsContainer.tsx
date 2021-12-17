import React from "react";
import { TweetsList } from "../TweetsList";
import { useGetSubscriptionsTweets } from "./hooks/useGetSubscriptionsTweets";

export const FeedTweetsContainer = () => {
  const { subscriptionsTweets, isLoading, getMoreTweets, hasTweets } =
    useGetSubscriptionsTweets();
  return (
    <TweetsList
      tweets={subscriptionsTweets}
      isLoading={isLoading}
      getMoreTweets={getMoreTweets}
      hasTweets={hasTweets}
    />
  );
};
