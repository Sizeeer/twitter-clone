import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogBox } from "../../../core/DialogBox";
import { useSignInStyles } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../../../store/ducks/user/actionCreators";
import { withNotification } from "../../../hoc/withNotification";
import { selectUserLoadingState } from "../../../store/ducks/user/selectors";
import { USER_LOADING_STATE } from "../../../store/ducks/user/contracts/reducer";
import { Color } from "@material-ui/lab/Alert";
import { selectNotification } from "../../../store/ducks/notification/selectors";

interface LoginModalInterface {
  isOpen: boolean;
  onClose: () => void;
  openNotification: (message: string, type: Color) => void;
}

export type LoginFormData = {
  username: string;
  password: string;
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .email("Неверно введена почта")
    .required("Данное поле обязательно"),
  password: yup
    .string()
    .min(8, "Минимальная длинна 8 символов")
    .required("Данное поле обязательно"),
});

const LoginModal: React.FC<LoginModalInterface> = ({
  isOpen,
  onClose,
  openNotification,
}: LoginModalInterface): React.ReactElement => {
  const classes = useSignInStyles();
  const userLoadingState = useSelector(selectUserLoadingState);
  const notificationData = useSelector(selectNotification);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    dispatch(fetchUserAction(data));

    reset({ username: "", password: "" });
  };

  React.useEffect(() => {
    if (notificationData.message) {
      openNotification(notificationData.message, notificationData.type);
    }
  }, [notificationData, openNotification]);

  return (
    <DialogBox title="Войти в аккаунт" open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="filled" component="fieldset" fullWidth>
          <FormGroup row>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-Mail"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.username?.message}
                  helperText={errors.username?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Пароль"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.loginSideDialogBtn}
              disabled={userLoadingState === USER_LOADING_STATE.LOADING}
              fullWidth
              type="submit"
            >
              Войти
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </DialogBox>
  );
};

export default withNotification(LoginModal);
