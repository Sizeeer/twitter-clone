import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../store/currentUser/selectors";
import { TweetsList } from "../TweetsList";
import { useGetSubscriptionsTweets } from "./hooks/useGetSubscriptionsTweets";

export const FeedTweetsContainer = () => {
  const currentUserData = useSelector(selectCurrentUserData);
  const { subscriptionsTweets, isLoading, getMoreTweets, hasTweets } =
    useGetSubscriptionsTweets();
  return (
    <TweetsList
      tweets={subscriptionsTweets}
      isLoading={isLoading}
      getMoreTweets={getMoreTweets}
      hasTweets={hasTweets}
      userId={currentUserData?.userId || ""}
    />
  );
};
