//Core
import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useSignInStyles } from "./theme";
import LoginModal from "./components/LoginModal";
import RegistrationModal from "./components/RegistrationModal";
import { clearNotificationAction } from "../../store/ducks/notification/actionCreators";

export const SignIn: React.FC = () => {
  const classes = useSignInStyles();
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState<"login" | "signUp">();

  const handleClickOpen = (value: "login" | "signUp"): void => {
    setVisible(value);
  };

  const handleClose = (): void => {
    setVisible(undefined);
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearNotificationAction());
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <section className={classes.blueSide}>
        <img
          className={classes.blueSideBackground}
          src="https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png"
          alt="backgroundImage"
        />
        <TwitterIcon className={classes.blueSideIcon} />
      </section>
      <section className={classes.loginSide}>
        <div className={classes.loginSideWrapper}>
          <TwitterIcon color="primary" className={classes.loginSideIcon} />
          <Typography variant="h4" className={classes.loginSideTitle}>
            В курсе происходящего
          </Typography>
          <Typography variant="h5" className={classes.loginSideSubTitle}>
            Присоединяйтесь к Твиттеру прямо сейчас!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginSideButton}
            fullWidth
            onClick={() => handleClickOpen("signUp")}
          >
            Зарегистрироваться
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.loginSideButton}
            fullWidth
            onClick={() => handleClickOpen("login")}
          >
            Войти
          </Button>
          <LoginModal isOpen={visible === "login"} onClose={handleClose} />

          <RegistrationModal
            isOpen={visible === "signUp"}
            onClose={handleClose}
          />
        </div>
      </section>
    </div>
  );
};
