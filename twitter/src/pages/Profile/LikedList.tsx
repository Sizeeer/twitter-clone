import React from "react";

import { TweetsList } from "../../components/TweetsList";
import { useGetLikedTweets } from "../../hooks/useGetLikedTweets";

export const LikedList = () => {
  const { likedTweets, isLoading, hasTweets, getMoreTweets } =
    useGetLikedTweets();

  return (
    <TweetsList
      tweets={likedTweets}
      isLoading={isLoading}
      hasTweets={hasTweets}
      getMoreTweets={getMoreTweets}
    />
  );
};
