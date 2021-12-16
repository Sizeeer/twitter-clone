import React from "react";
import { TweetActionButton } from "./TweetActionButton";

import styled from "styled-components";
import { RetweetIcon, LikeIcon, LikeBorderIcon } from "./Icons";

export enum TweetButtonColors {
  like = "rgb(235,76,91)",
  retweet = "rgb(80,200,120)",
}

export enum TweetButtonBG {
  likeBG = "rgba(235,76,91, 0.04)",
  retweetBG = "rgba(80,200,120, 0.04)",
}

interface Props {
  retweetsCount: number;
  isRetweeted: boolean;
  retweetHandler: (e: any) => void;
  likesCount: number;
  isLiked: boolean;
  likeHandler: (e: any) => void;
}

export const ActionsButtons = ({
  isLiked,
  likeHandler,
  likesCount,
  retweetHandler,
  isRetweeted,
  retweetsCount,
}: Props) => {
  return (
    <>
      <TweetActionButton
        color={TweetButtonColors.retweet}
        bg={TweetButtonBG.retweetBG}
        count={retweetsCount}
        isRetweeted={isRetweeted}
        onClick={retweetHandler}
      >
        <RetweetIcon size={17} />
      </TweetActionButton>
      <TweetActionButton
        color={TweetButtonColors.like}
        bg={TweetButtonBG.likeBG}
        count={likesCount}
        isLiked={isLiked}
        onClick={likeHandler}
      >
        {isLiked ? <LikeIcon size={17} /> : <LikeBorderIcon size={17} />}
      </TweetActionButton>
    </>
  );
};
