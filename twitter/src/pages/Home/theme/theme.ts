import makeStyles from "@material-ui/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useHomePageClasses = makeStyles((theme: Theme) => ({
  navSideWrapper: {
    height: "100vh",
  },
  sideUserCard: {
    "&:hover": {
      backgroundColor: "rgba(29, 161, 242, .1)",
    },
    borderRadius: 30,
    padding: "9px 12px 9px 9px",
    cursor: "pointer",
  },
  navSideList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  tweetFooterIcon: {
    fontSize: 17,
  },
  fullTweetInfoLink: {
    fontSize: 15,
    textDecoration: "none",
    color: "#000",
    fontWeight: 700,
    "& span": {
      color: "gray",
      fontWeight: 400,
    },
    "&:hover": {
      textDecoration: "underline",
    },
    "&:first-child": {
      marginRight: 10,
    },
  },
  navSideListItem: {
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      "& div": {
        backgroundColor: "rgba(29, 161, 242, .1)",

        "& h6": {
          color: theme.palette.primary.main,
        },

        "& svg path": {
          fill: theme.palette.primary.main,
        },
      },
    },

    "& div": {
      display: "inline-flex",
      alignItems: "center",
      height: 50,
      borderRadius: 30,
      padding: "12px 15px 12px 12px",
      marginBottom: 10,
      transition: "background-color .1s ease-in-out",
    },
  },
  navSideListItemLabel: {
    fontWeight: 700,
    marginLeft: 15,
  },
  navMainIcon: {
    fontSize: 36,
  },
  navSideListIcon: {
    fontSize: 28,
  },
  navSideTweetBtn: {
    height: 46,
    fontWeight: 700,
    maxWidth: 230,
  },
  tweetsWrapper: {
    height: "100%",
    flexGrow: 1,
    borderTop: 0,
  },
  tweetsHeader: {
    display: "flex",
    alignItems: "center",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    position: "sticky",
    top: 0,
    zIndex: 99,
    padding: "10px 0 10px 15px",
    "& h6": {
      fontWeight: 800,
    },
  },
  sideUserCardInfo: {
    fontSize: 15,
  },
  tweetsUserName: {
    color: grey[500],
  },
  tweetFooterMenu: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: -10,
    marginTop: 5,
  },

  tweet: {
    cursor: "pointer",
    transition: "background-color .05s ease-in-out",
    display: "flex",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    padding: "10px 15px",
    "&:hover": {
      backgroundColor: "rgb(245,248,250)",
    },
  },
  tweetMenu: {
    "& 	.MuiMenu-paper": {
      boxShadow: "0px 0px 10px 7px rgba(0, 0, 0, 0.09)",
    },
    "& .MuiList-padding": {
      paddingTop: 0,
      paddingBottom: 0,
    },
    "& .MuiPaper-root": {
      width: 384,
    },
  },
  tweetWrapper: {
    color: "inherit",
    textDecoration: "none",
  },
  fullTweetHeaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  fullTweetHeaderInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tweetAvatar: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  writeTweet: {
    display: "flex",
  },
  writeTweetArea: {
    width: "100%",
    maxWidth: 510,
    maxHeight: 100,
    overflowY: "auto",
    outline: "none",
    border: "none",
    fontSize: 20,
    whiteSpace: "pre-wrap",
    marginBottom: 20,
    cursor: "text",
  },
  writeTweetAreaWrapper: {
    flex: 1,
  },
  writeTweetFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,
  },
  writeTweetFooterItem: {
    display: "flex",
    alignItems: "center",
    marginLeft: -14,
  },
  writeTweetFooterItemCircular: {
    position: "relative",
    width: 20,
    height: 20,
    margin: "0 10px",
    "& .MuiCircularProgress-root": {
      position: "absolute",
    },
  },
  rightSideList: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginTop: 12,
  },
  rightSideListTitle: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: "12px 16px",
    backgroundColor: "rgba(0,0,0,0.03)",
    "& h6": {
      fontWeight: 800,
      fontSize: 19,
    },
  },
  rightSideThemesList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  rightSideListItem: {
    backgroundColor: "rgba(0,0,0,0.03)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(235,238,240)",
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
      width: "100%",
    },
    "&:last-child": {
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
      "& span": {
        fontWeight: 400,
        color: theme.palette.primary.main,
      },
    },
  },
  rightSideThemesListItem: {
    "& span": {
      fontWeight: 700,
      fontSize: 15,
    },
    "& p": {
      fontSize: 13,
      color: grey[500],
    },
  },
  rightSideListReadingItem: {
    "& h6": {
      display: "flex",
      flexDirection: "column",
      "& b": {
        fontSize: 15,
      },

      "& span": {
        fontWeight: 400,
        fontSize: 13,
      },
    },
  },
  rightSideListReadingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightSideListReadingInfo: {
    display: "flex",
  },
  loaderWrapper: {
    textAlign: "center",
    marginTop: 70,
  },
  uploadImagesWrapper: {
    position: "relative",
    display: "block",
  },
  uploadImagesInput: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    opacity: 0,
    cursor: "pointer",
  },
  uploadImageWrapper: {
    position: "relative",
    width: "100%",
    height: 300,
    marginTop: 15,
    marginRight: 10,
    "&:last-child": {
      marginRight: 0,
    },
  },
}));
