import TwitterIcon from "@material-ui/icons/Twitter";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "./Routes";
import { Status } from "./shared/types/communicationTypes";
import { me } from "./store/currentUser/currentUserSlice";
import { selectCurrentUserStatus } from "./store/currentUser/selectors";
import { useSignInStyles } from "./pages/SignIn/theme";
import { selectNotification } from "./store/notification/selectors";
import { withNotification } from "./hoc/withNotification";
import { Color } from "@material-ui/lab/Alert";

interface AppProps {
  openNotification: (message: string, type: Color) => void;
}

const App = ({ openNotification }: AppProps) => {
  const dispatch = useDispatch();

  const classes = useSignInStyles();

  const isReady = useSelector(selectCurrentUserStatus);
  const notificationData = useSelector(selectNotification);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  React.useEffect(() => {
    if (notificationData.message) {
      openNotification(notificationData.message, notificationData.type);
    }
  }, [notificationData, openNotification]);

  if (isReady === Status.LOADING) {
    return (
      <div className={classes.centeredItem}>
        <TwitterIcon color="primary" style={{ width: 60, height: 60 }} />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default withNotification(App);
