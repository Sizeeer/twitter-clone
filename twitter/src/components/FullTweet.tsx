// import {
//   Avatar,
//   Button,
//   CircularProgress,
//   Divider,
//   Paper,
//   Typography,
// } from "@material-ui/core";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import {
//   fetchTweetDataAction,
//   setTweetDataAction,
// } from "../store/ducks/tweet/contracts/actionCreators";
// import {
//   selectLoadingState,
//   selectTweetData,
// } from "../store/ducks/tweet/selectors";
// import { useHomePageClasses } from "../pages/Home/theme/theme";
// import classnames from "classnames";
// import format from "date-fns/format";
// import IconButton from "@material-ui/core/IconButton";
// import Menu from "@material-ui/core/Menu";
// import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import MenuItem from "@material-ui/core/MenuItem";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { DialogBox } from "./DialogBox";
// import RefreshIcon from "@material-ui/icons/Refresh";
// import { Link, useHistory } from "react-router-dom";
// import { TweetButton, TweetButtonBG, TweetButtonColors } from "./TweetButton";
// import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
// import RepeatIcon from "@material-ui/icons/Repeat";
// import ReplyOutlinedIcon from "@material-ui/icons/ReplyOutlined";
// import { useGetTweet } from "../hooks/useGetTweet";

// const addingOptions = [
//   {
//     title: "Удалить",
//     icon: <DeleteOutlineIcon style={{ marginRight: 9 }} />,
//     color: "rgb(235,76,91)",
//   },
//   {
//     title: "Обновить",
//     icon: <RefreshIcon style={{ marginRight: 9 }} />,
//     color: "inherit",
//   },
// ];

// export const FullTweet: React.FC = (): React.ReactElement | null => {
//   const classes = useHomePageClasses();
//   const params: { id: SVGStringList } = useParams();

//   const { deleteTweet, isLoading: isDeleteLoading } = useDeleteTweet();

//   const dispatch = useDispatch();
//   const history = useHistory();
//   const tweetData = useSelector(selectTweetData);
//   const isLoading = useSelector(selectLoadingState);

//   const tweetId = params.id;
//   const { tweet, isLoading } = useGetTweet(tweetId);

//   const openInProgressWindow = React.useContext(FuncInProgressContext);

//   const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

//   const openDialogHandler = () => {
//     setIsOpenDialog(true);
//   };

//   const closeDialogHandler = () => {
//     setIsOpenDialog(false);
//   };

//   const deleteTweetHandler = () => {
//     deleteTweet(tweetId);
//     history.push("/home");
//   };

//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (event: React.MouseEvent<HTMLElement>) => {
//     if (event.currentTarget.textContent === "Удалить") {
//       openDialogHandler();
//     }

//     setAnchorEl(null);
//   };

//   if (isLoading) {
//     return (
//       <div className={classes.loaderWrapper}>
//         <CircularProgress color="primary" />
//       </div>
//     );
//   }

//   if (tweet) {
//     return (
//       <>
//         <Paper
//           variant="outlined"
//           square
//           style={{ padding: "15px 15px 0px 15px" }}
//         >
//           <div className={classnames(classes.fullTweetHeaderWrapper)}>
//             <div className={classnames(classes.fullTweetHeaderInfo)}>
//               <Avatar
//                 className={classes.tweetAvatar}
//                 alt="User Avatar"
//                 src={current}
//               />
//               <Typography>
//                 <b>{tweetData.user.fullname}</b>{" "}
//                 <div>
//                   <span className={classes.tweetsUserName}>
//                     @{tweetData.user.username}
//                   </span>
//                   &nbsp;
//                 </div>
//               </Typography>
//             </div>
//             <div>
//               <IconButton
//                 aria-label="more"
//                 aria-controls="long-menu"
//                 aria-haspopup="true"
//                 style={{ transform: "rotate(90deg)" }}
//                 onClick={handleClick}
//               >
//                 <MoreVertIcon />
//               </IconButton>
//               <Menu
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 className={classes.tweetMenu}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//               >
//                 {addingOptions.map((option) => (
//                   <MenuItem
//                     style={{
//                       paddingTop: 16,
//                       paddingBottom: 16,
//                       paddingLeft: 16,
//                       paddingRight: 16,
//                       display: "flex",
//                       alignItems: "center",
//                       color: option.color,
//                     }}
//                     key={option.title}
//                     onClick={handleClose}
//                   >
//                     {option.icon}
//                     <span>{option.title}</span>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </div>
//           </div>
//           <Typography
//             variant="body1"
//             style={{ wordBreak: "break-word", fontSize: 23 }}
//           >
//             {tweetData.text}
//           </Typography>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//               marginBottom: 15,
//             }}
//           >
//             {tweetData.images.length > 0 &&
//               tweetData.images.map((image) => (
//                 <div className={classes.uploadImageWrapper}>
//                   <div
//                     style={{
//                       backgroundImage: `url(${image})`,
//                       backgroundPosition: "center center",
//                       backgroundRepeat: "no-repeat",
//                       backgroundSize: "cover",
//                       width: "100%",
//                       height: "100%",
//                       borderRadius: 15,
//                     }}
//                   />
//                 </div>
//               ))}
//           </div>
//           <span className={classes.tweetsUserName}>
//             {format(new Date(tweetData.createdAt), "p · MMM d, y")}
//           </span>
//           <Divider style={{ marginTop: 20 }} />
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               padding: "16px 4px 16px 4px",
//             }}
//           >
//             <Link
//               to={(location) => `${location.pathname}/retweets`}
//               className={classes.fullTweetInfoLink}
//             >
//               37&nbsp;
//               <span>Ретвитов</span>
//             </Link>
//             <Link
//               to={(location) => `${location.pathname}/likes`}
//               className={classes.fullTweetInfoLink}
//             >
//               37&nbsp;
//               <span>Лайков</span>
//             </Link>
//           </div>
//           <Divider />
//           <div
//             className={classes.tweetFooterMenu}
//             style={{ justifyContent: "space-around", marginBottom: 5 }}
//           >
//             <TweetButton
//               color={TweetButtonColors.main}
//               bg={TweetButtonBG.mainBG}
//               fz={21}
//             >
//               <ChatBubbleOutlineIcon className={classes.tweetFooterIcon} />
//             </TweetButton>
//             <TweetButton
//               color={TweetButtonColors.retweet}
//               bg={TweetButtonBG.retweetBG}
//               fz={21}
//             >
//               <RepeatIcon className={classes.tweetFooterIcon} />
//             </TweetButton>
//             <TweetButton
//               color={TweetButtonColors.like}
//               bg={TweetButtonBG.likeBG}
//               fz={21}
//             >
//               <FavoriteBorderOutlinedIcon className={classes.tweetFooterIcon} />
//             </TweetButton>
//             <TweetButton
//               color={TweetButtonColors.main}
//               bg={TweetButtonBG.mainBG}
//               fz={21}
//             >
//               <ReplyOutlinedIcon className={classes.tweetFooterIcon} />
//             </TweetButton>
//           </div>
//         </Paper>
//         <DialogBox
//           title="Вы уверены, что хотите удалить твит?"
//           open={isOpenDialog}
//           onClose={closeDialogHandler}
//         >
//           <div style={{ width: 437 }}>
//             <Typography variant="body1">
//               Если вы удалите данный твит, его восстановление будет невозможным.
//               Вы хотите продолжить?
//             </Typography>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 width: "100%",
//                 marginTop: 15,
//               }}
//             >
//               <Button variant="contained" onClick={closeDialogHandler}>
//                 Отмена
//               </Button>
//               <Button
//                 variant="contained"
//                 style={{ backgroundColor: "#e0245e", color: "#fff" }}
//                 onClick={deleteTweetHandler}
//               >
//                 Удалить
//               </Button>
//             </div>
//           </div>
//         </DialogBox>
//       </>
//     );
//   }

//   return null;
// };
export {};
