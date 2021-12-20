import React from "react";

import { TweetsList } from "../../components/TweetsList";
import { useGetLikedTweets } from "../../hooks/useGetLikedTweets";
interface Props {
  userId: string;
}
export const LikedList = ({ userId }: Props) => {
  const { likedTweets, isLoading, hasTweets, getMoreTweets } =
    useGetLikedTweets(userId);

  return (
    <TweetsList
      tweets={likedTweets}
      isLoading={isLoading}
      hasTweets={hasTweets}
      getMoreTweets={getMoreTweets}
      userId={userId}
    />
  );
};
