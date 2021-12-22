import { Avatar, Box } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { useGetCurrentTweet } from "../hooks/useGetCurrentTweet";
import { useGetLikedTweets } from "../hooks/useGetLikedTweets";
import { useSubscribe } from "../hooks/useSubscribe";
import { PersonalTweetAttributes } from "../shared/types/tweetTypes";
import { selectCurrentUserData } from "../store/currentUser/selectors";
import { Loader } from "./Loader";
import { ActionsButtons } from "./Tweet/ActionsButtons";
import ClearIcon from "@material-ui/icons/Clear";
import { DeleteModal } from "./Tweet/DeleteModal";
import { useDeleteTweet } from "./Tweet/hooks/useDeleteTweet";
import { useLikeTweet } from "./Tweet/hooks/useLikeTweet";
import { useRetweet } from "./Tweet/hooks/useRetweet";
import { RetweetIcon } from "./Tweet/Icons";
import {
  ActionsMenuWrapper,
  TweetWrapper,
  WhoRetweetedWrapper,
} from "./Tweet/Tweet";
import { TweetImages } from "./Tweet/TweetImage";
import { TweetText } from "./Tweet/TweetText";
import { TweetUserInfo } from "./Tweet/TweetUserInfo";
import styled from "styled-components";

export const UserAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  margin-right: 12px;
`;

export const FullTweet = () => {
  const { id: tweetId } = useParams<{ id: string }>();
  const { currentTweet, isLoading } = useGetCurrentTweet(tweetId);
  const currentUserData = useSelector(selectCurrentUserData);
  const { likedTweets } = useGetLikedTweets(currentUserData!.userId);

  const isLiked = useMemo(() => {
    return Boolean(likedTweets?.find((el) => el.tweetId === tweetId));
  }, [likedTweets, tweetId]);

  const isRetweeted = useMemo(() => {
    return (
      Object.assign({}, currentTweet).hasOwnProperty("retweetedUser") &&
      (currentTweet as PersonalTweetAttributes)?.retweetedUser?.userId ===
        currentUserData?.userId
    );
  }, [currentTweet, currentUserData?.userId]);

  const [likedState, setLikedState] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(currentTweet?.likes || 0);

  const [retweetedState, setRetweetedState] = useState(isRetweeted);
  const [retweetsCount, setRetweetsCount] = useState(
    currentTweet?.retweets || 0
  );

  const { deleteTweet, isDeleteLoading } = useDeleteTweet();
  const { like, unlike } = useLikeTweet();
  const { retweet, unretweet } = useRetweet();
  const { subscribe, unsubscribe } = useSubscribe();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpenPopover = Boolean(anchorEl);

  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  const closeDialogHandler = (): void => {
    setIsOpenDialog(false);
  };

  const openDialogHandler = (): void => {
    setIsOpenDialog(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const onClosePopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  const options = useMemo(() => {
    return {
      owner: [
        {
          title: "Удалить",
          icon: <DeleteOutlineIcon />,
          action: (event: React.MouseEvent<HTMLElement>): void => {
            event.preventDefault();
            event.stopPropagation();
            openDialogHandler();
            setAnchorEl(null);
          },
          color: "rgb(235, 76, 91)",
        },
      ],
      sub: [
        {
          title: `Отписаться от ${currentTweet?.user?.login}`,
          icon: <ClearIcon />,
          action: (event: React.MouseEvent<HTMLElement>): void => {
            event.preventDefault();
            event.stopPropagation();
            unsubscribe(currentTweet?.user?.userId || "");
            setAnchorEl(null);
          },
          color: "rgb(235, 76, 91)",
        },
      ],
    };
  }, []);

  const onLike = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    like(tweetId);
    setLikedState(true);
    setLikesCount((prev) => prev + 1);
  };

  const onUnlike = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    unlike(tweetId);
    setLikedState(false);
    setLikesCount((prev) => prev - 1);
  };

  const onRetweet = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    retweet(tweetId);
    setRetweetedState(true);
    setRetweetsCount((prev) => prev + 1);
  };

  const onUnretweet = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    unretweet(tweetId);
    setRetweetedState(false);
    setRetweetsCount((prev) => prev - 1);
  };

  const onDelete = () => {
    deleteTweet(tweetId);
  };

  useEffect(() => {
    if (!isDeleteLoading) {
      closeDialogHandler();
    }
  }, [isDeleteLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (currentTweet) {
    return (
      <>
        {isRetweeted && (
          <WhoRetweetedWrapper>
            <RetweetIcon size={16} />
            <span>@{currentUserData?.login} ретвитнул</span>
          </WhoRetweetedWrapper>
        )}
        <Box display="flex">
          <UserAvatar alt="user avatar" src={currentTweet?.user?.avatar} />
          <Box flexGrow={1}>
            <TweetUserInfo
              user={currentTweet?.user}
              createdAt={currentTweet?.createdAt || new Date().getTime()}
              anchorEl={anchorEl}
              open={isOpenPopover}
              onClosePopover={onClosePopover}
              isOwner={currentUserData?.login === currentTweet?.user?.login}
              handleClick={handleClick}
              options={options}
            />
            <TweetText text={currentTweet?.text} />
            <TweetImages images={currentTweet?.images || []} />
            <ActionsMenuWrapper>
              <ActionsButtons
                isLiked={likedState}
                likesCount={likesCount}
                likeHandler={likedState ? onUnlike : onLike}
                isRetweeted={retweetedState}
                retweetsCount={retweetsCount}
                retweetHandler={retweetedState ? onUnretweet : onRetweet}
              />
            </ActionsMenuWrapper>
          </Box>
        </Box>
        <DeleteModal
          open={isOpenDialog}
          onClose={closeDialogHandler}
          onDelete={onDelete}
          isLoading={isDeleteLoading}
        />
      </>
    );
  }

  return null;
};
