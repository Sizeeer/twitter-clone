import React from "react";

import { TweetsList } from "../../components/TweetsList";
import { useGetPersonalTweets } from "../../hooks/useGetPersonalTweets";

export const PersonalList = () => {
  const { personalTweets, isLoading, hasTweets, getMoreTweets } =
    useGetPersonalTweets();

  return (
    <TweetsList
      tweets={personalTweets}
      isLoading={isLoading}
      hasTweets={hasTweets}
      getMoreTweets={getMoreTweets}
    />
  );
};
