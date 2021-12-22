import "react-medium-image-zoom/dist/styles.css";

import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useSubscribe } from "../../hooks/useSubscribe";
import { TweetAttributes } from "../../shared/types/tweetTypes";
import { selectCurrentUserData } from "../../store/currentUser/selectors";
import { ActionsButtons } from "./ActionsButtons";
import { DeleteModal } from "./DeleteModal";
import { useDeleteTweet } from "./hooks/useDeleteTweet";
// import { useGetTweets } from "./hooks/useGetTweets";
import { useLikeTweet } from "./hooks/useLikeTweet";
import { useRetweet } from "./hooks/useRetweet";
import { RetweetIcon } from "./Icons";
import { TweetImages } from "./TweetImage";
import { TweetText } from "./TweetText";
import { TweetUserInfo } from "./TweetUserInfo";

const TweetCardLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const TweetWrapper = styled(Paper)`
  flex-direction: column;
  cursor: pointer;
  transition: background-color 0.05s ease-in-out;
  display: flex;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  padding: 10px 15px;
  &:hover {
    background-color: rgb(245, 248, 250);
  }
`;

export const WhoRetweetedWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #536471;
  font-eight: 700;
  margin-bottom: 10px;

  span {
    margin-left: 10px;
  }
`;

export const ActionsMenuWrapper = styled.div`
  display: flex;
  margin-left: -10px;
  margin-top: 5px;
`;

export const UserAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;

type Props = TweetAttributes & { isLiked: boolean; isRetweeted: boolean };

export const Tweet = ({
  tweetId,
  images,
  text,
  createdAt = new Date(),
  isLiked,
  isRetweeted,
  user,
  likes,
  retweets,
}: Props) => {
  const [likedState, setLikedState] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes);

  const [retweetedState, setRetweetedState] = useState(isRetweeted);
  const [retweetsCount, setRetweetsCount] = useState(retweets);

  const { deleteTweet, isDeleteLoading } = useDeleteTweet();
  const { like, unlike } = useLikeTweet();
  const { retweet, unretweet } = useRetweet();
  const { subscribe, unsubscribe } = useSubscribe();

  const currentUserData = useSelector(selectCurrentUserData);

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
          title: `Отписаться от ${user.login}`,
          icon: <ClearIcon />,
          action: (event: React.MouseEvent<HTMLElement>): void => {
            event.preventDefault();
            event.stopPropagation();
            unsubscribe(user.userId);
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

  return (
    <>
      <TweetCardLink to={`/tweets/${tweetId}`}>
        <TweetWrapper variant="outlined" square>
          {isRetweeted && (
            <WhoRetweetedWrapper>
              <RetweetIcon size={16} />
              <span>@{currentUserData?.login} ретвитнул</span>
            </WhoRetweetedWrapper>
          )}
          <Box display="flex">
            <UserAvatar alt="user avatar" src={user?.avatar} />
            <Box flexGrow={1}>
              <TweetUserInfo
                user={user}
                createdAt={createdAt}
                anchorEl={anchorEl}
                open={isOpenPopover}
                onClosePopover={onClosePopover}
                isOwner={currentUserData?.login === user.login}
                handleClick={handleClick}
                options={options}
              />
              <TweetText text={text} />
              <TweetImages images={images} />
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
        </TweetWrapper>
      </TweetCardLink>
      <DeleteModal
        open={isOpenDialog}
        onClose={closeDialogHandler}
        onDelete={onDelete}
        isLoading={isDeleteLoading}
      />
    </>
  );
};
