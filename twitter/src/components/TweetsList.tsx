import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetLikedTweets } from "../hooks/useGetLikedTweets";
import { useGetPersonalTweets } from "../hooks/useGetPersonalTweets";

import { useOnScreen } from "../hooks/useOnScreen";
import {
  PersonalTweetAttributes,
  TweetAttributes,
} from "../shared/types/tweetTypes";
import { selectCurrentUserData } from "../store/currentUser/selectors";
import { EmptyTweets } from "./EmptyTweets";
import { Loader } from "./Loader";
import { useGetSubscriptionsTweets } from "./Tweet/hooks/useGetSubscriptionsTweets";
import { Tweet } from "./Tweet/Tweet";

interface Props {
  tweets?: TweetAttributes[];
  isLoading: boolean;
  hasTweets?: boolean;
  getMoreTweets: () => void;
  userId: string;
}

export const TweetsList = ({
  tweets = [],
  isLoading,
  hasTweets = false,
  getMoreTweets,
  userId,
}: Props) => {
  const { likedTweets } = useGetLikedTweets(userId);
  const currentUserData = useSelector(selectCurrentUserData);
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (isOnScreen && hasTweets) {
      getMoreTweets();
    }
  }, [isOnScreen]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {tweets?.length === 0 ? (
        <EmptyTweets />
      ) : (
        <>
          {tweets?.map((tweet: TweetAttributes, i) => {
            return (
              <React.Fragment key={i}>
                <Tweet
                  key={tweet.tweetId}
                  isLiked={Boolean(
                    likedTweets?.find((el) => el.tweetId === tweet.tweetId)
                  )}
                  isRetweeted={
                    Object.assign({}, tweet).hasOwnProperty("retweetedUser") &&
                    (tweet as PersonalTweetAttributes).retweetedUser?.userId ===
                      currentUserData?.userId
                  }
                  {...tweet}
                />
              </React.Fragment>
            );
          })}
          {isLoading ? <Loader /> : null}
        </>
      )}
      <div ref={ref} />
    </>
  );
};
