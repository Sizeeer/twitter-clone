import makeStyles from "@material-ui/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useHomePageClasses = makeStyles((theme: Theme) => ({
  sideUserCard: {
    "&:hover": {
      backgroundColor: "rgba(29, 161, 242, .1)",
    },
    borderRadius: 30,
    padding: "9px 12px 9px 9px",
    cursor: "pointer",
    position: "relative",
  },
  navSideList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
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
  fullTweetHeaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
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
