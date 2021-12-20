import React from "react";

import { TweetsList } from "../../components/TweetsList";
import { useGetPersonalTweets } from "../../hooks/useGetPersonalTweets";

interface Props {
  userId: string;
}

export const PersonalList = ({ userId }: Props) => {
  const { personalTweets, isLoading, hasTweets, getMoreTweets } =
    useGetPersonalTweets(userId);

  return (
    <TweetsList
      tweets={personalTweets}
      isLoading={isLoading}
      hasTweets={hasTweets}
      getMoreTweets={getMoreTweets}
      userId={userId}
    />
  );
};
