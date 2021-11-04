import makeStyles from "@material-ui/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export const useSignInStyles = makeStyles((theme: Theme) => ({
  centeredItem: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    height: "100vh",
  },
  blueSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#71c9f8",
    position: "relative",
    overflow: "hidden",
  },
  blueSideBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  blueSideIcon: {
    position: "relative",
    fontSize: "15vw",
    color: "#fff",
  },
  loginSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "45vw",
  },
  loginSideWrapper: {
    maxWidth: "80%",
  },
  loginSideIcon: {
    fontSize: 47,
    marginBottom: 60,
  },
  loginSideTitle: {
    fontSize: 64,
    fontWeight: 700,
    marginBottom: 40,
  },
  loginSideSubTitle: {
    fontSize: 31,
    fontWeight: 700,
    marginBottom: 30,
  },
  loginSideButton: {
    maxWidth: 380,
    minHeight: 48,
    marginBottom: 30,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  loginSideDialogField: {
    marginBottom: theme.spacing(3),
  },
  loginSideDialogBtn: {
    marginBottom: theme.spacing(2),
  },
}));
