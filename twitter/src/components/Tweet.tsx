import "react-medium-image-zoom/dist/styles.css";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RepeatIcon from "@material-ui/icons/Repeat";
import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
import React from "react";
import Zoom from "react-medium-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useHomePageClasses } from "../pages/Home/theme/theme";
import { formatDate } from "../utils/formatDate";
import { DialogBox } from "./DialogBox";
import { TweetButton, TweetButtonBG, TweetButtonColors } from "./TweetButton";
import { useDeleteTweet } from "../hooks/useDeleteTweet";
import { useLikeTweet } from "../hooks/useLikeTweet";
import { useRetweet } from "../hooks/useRetweet";
import { useGetTweets } from "../hooks/useGetTweets";
import { TweetAttributes } from "../shared/types/tweetTypes";
import { selectCurrentUserData } from "../store/currentUser/selectors";

const addingOptions = [
  {
    title: "Удалить",
  },
];

export const TweetPaper = withStyles({
  root: {
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 0,
  },
})(Paper);

export const Tweet = ({
  tweetId,
  userId,
  images,
  text,
  createdAt = new Date(),
  updatedAt = new Date(),
}: TweetAttributes) => {
  const dispatch = useDispatch();
  const classes = useHomePageClasses();
  const { likedTweets } = useGetTweets();
  const isLikedTweet = !!likedTweets.find((tweet) => tweet.tweetId === tweetId);

  const { deleteTweet, isLoading: isDeleteLoading } = useDeleteTweet();
  const { like, unlike } = useLikeTweet();
  const { retweet } = useRetweet();

  const currentUserData = useSelector(selectCurrentUserData);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
  const handleCloseMenuItem = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.textContent === "Удалить") {
      openDialogHandler();
    }
    setAnchorEl(null);
  };

  const onLike = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    like(tweetId);
  };

  const onUnlike = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    unlike(tweetId);
  };

  const onRetweet = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    retweet(tweetId);
  };

  return (
    <>
      <Link to={`/tweets/${tweetId}`} className={classes.tweetWrapper}>
        <Paper
          className={classes.tweet}
          style={{ flexDirection: "column" }}
          variant="outlined"
          square
        >
          {/* {parentKey && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#536471",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              <RepeatIcon style={{ marginRight: 10, fontSize: 16 }} />
              <span>{whoRetweeted} ретвитнул</span>
            </div>
          )} */}
          <div style={{ display: "flex" }}>
            <Avatar
              className={classes.tweetAvatar}
              alt="User Avatar"
              src={currentUserData?.avatar}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <Typography>
                    <b>{currentUserData?.name}</b>{" "}
                    <span className={classes.tweetsUserName}>
                      @{currentUserData?.login}
                    </span>
                    &nbsp;
                    <span className={classes.tweetsUserName}>·</span>&nbsp;
                    <span className={classes.tweetsUserName}>
                      {formatDate(new Date(createdAt))}
                    </span>
                  </Typography>
                </div>
                <div>
                  <IconButton
                    onClick={handleClick}
                    style={{
                      transform: "rotate(90deg)",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <MoreVertIcon style={{ fontSize: 21 }} />
                  </IconButton>
                  <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleCloseMenuItem}
                    className={classes.tweetMenu}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    {addingOptions.map((option) => (
                      <MenuItem
                        style={{
                          paddingTop: 16,
                          paddingBottom: 16,
                          paddingLeft: 16,
                          paddingRight: 16,
                          display: "flex",
                          alignItems: "center",
                          color: "rgb(235,76,91)",
                        }}
                        key={option.title}
                        onClick={handleCloseMenuItem}
                      >
                        <DeleteOutlineIcon style={{ marginRight: 9 }} />
                        <span>{option.title}</span>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
              <Typography variant="body1" style={{ wordBreak: "break-word" }}>
                {text.split(" ").map((el) => {
                  if (el.includes("#")) {
                    return (
                      <>
                        <Link to="/" style={{ color: "#1da1f2" }}>
                          {el}
                        </Link>{" "}
                      </>
                    );
                  }

                  return <>{el} </>;
                })}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                className="viewImage"
              >
                {images.length > 0 &&
                  images.map((image, i) => (
                    <div
                      key={tweetId + i}
                      className={classes.uploadImageWrapper}
                    >
                      <Zoom
                        zoomMargin={50}
                        wrapStyle={{ height: "100%", width: "100%", zIndex: 2 }}
                      >
                        <img
                          src={image}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            borderRadius: 15,
                            border: "1px solid rgba(0,0,0,0.3)",
                          }}
                          alt="preview"
                        />
                      </Zoom>
                    </div>
                  ))}
              </div>

              <div className={classes.tweetFooterMenu}>
                <TweetButton
                  color={TweetButtonColors.main}
                  bg={TweetButtonBG.mainBG}
                  counter={
                    <span style={{ fontSize: 13, marginLeft: 5 }}>1</span>
                  }
                >
                  <ChatBubbleOutlineIcon className={classes.tweetFooterIcon} />
                </TweetButton>
                <TweetButton
                  color={TweetButtonColors.retweet}
                  bg={TweetButtonBG.retweetBG}
                  counter={
                    <span style={{ fontSize: 13, marginLeft: 5 }}>1</span>
                  }
                  onClick={onRetweet}
                >
                  <RepeatIcon className={classes.tweetFooterIcon} />
                </TweetButton>
                <TweetButton
                  color={TweetButtonColors.like}
                  bg={TweetButtonBG.likeBG}
                  counter={
                    <span style={{ fontSize: 13, marginLeft: 5 }}>1</span>
                  }
                  isLiked={isLikedTweet}
                  onClick={isLikedTweet ? onUnlike : onLike}
                >
                  {isLikedTweet ? (
                    <FavoriteIcon className={classes.tweetFooterIcon} />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      className={classes.tweetFooterIcon}
                    />
                  )}
                </TweetButton>
                <TweetButton
                  color={TweetButtonColors.main}
                  bg={TweetButtonBG.mainBG}
                  counter={
                    <span style={{ fontSize: 13, marginLeft: 5 }}>1</span>
                  }
                >
                  <ReplyOutlinedIcon className={classes.tweetFooterIcon} />
                </TweetButton>
              </div>
            </div>
          </div>
        </Paper>
      </Link>
      <DialogBox
        title="Вы уверены, что хотите удалить твит?"
        open={isOpenDialog}
        onClose={closeDialogHandler}
      >
        <div style={{ width: 437 }}>
          <Typography variant="body1">
            Если вы удалите данный твит, его восстановление будет невозможным.
            Вы хотите продолжить?
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 15,
            }}
          >
            <Button variant="contained" onClick={closeDialogHandler}>
              Отмена
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#e0245e", color: "#fff" }}
              onClick={() => deleteTweet(tweetId)}
              disabled={isDeleteLoading}
            >
              Удалить
            </Button>
          </div>
        </div>
      </DialogBox>
    </>
  );
};
