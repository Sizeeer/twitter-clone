import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { clearNotification } from "../store/notification/notificationSlice";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface NotificationObj {
  text: string;
  type: Color;
}

export const withNotification = (WrappedComponent: any) => {
  const Modal = (props: any) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState<boolean>(false);
    const [notificationObj, setNotificationObj] =
      React.useState<NotificationObj>();

    const handleClose = (_?: React.SyntheticEvent): void | undefined => {
      setOpen(false);
      dispatch(clearNotification());
    };

    const openNotification = useCallback(
      (message: string, type: Color): void => {
        setNotificationObj({ text: message, type });
        setOpen(true);
      },
      []
    );

    return (
      <>
        <WrappedComponent openNotification={openNotification} {...props} />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notificationObj?.type}>
            {notificationObj?.text}
          </Alert>
        </Snackbar>
      </>
    );
  };
  return Modal;
};
