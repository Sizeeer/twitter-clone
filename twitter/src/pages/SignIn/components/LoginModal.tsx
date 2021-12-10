import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogBox } from "../../../components/DialogBox";
import { useSignInStyles } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "@material-ui/lab/Alert";
import { login } from "../../../store/auth/authSlice";
import { withNotification } from "../../../hoc/withNotification";
import { selectNotification } from "../../../store/notification/selectors";
import { selectAuthStatus } from "../../../store/auth/selectors";
import { Status } from "../../../shared/types/communicationTypes";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type LoginFormData = {
  username: string;
  password: string;
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Данное поле обязательно"),
  password: yup
    .string()
    .min(8, "Минимальная длинна 8 символов")
    .required("Данное поле обязательно"),
});

export const LoginModal = ({
  isOpen,
  onClose,
}: LoginModalProps): React.ReactElement => {
  const classes = useSignInStyles();

  const dispatch = useDispatch();

  const authStatus = useSelector(selectAuthStatus);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    dispatch(login(data));
    reset({ username: "", password: "" });
  };

  useEffect(() => {
    if (authStatus === Status.ERROR || authStatus === Status.SUCCESS) {
      onClose();
    }
  }, [authStatus, onClose]);

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
                  label="Login"
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
              disabled={authStatus === Status.LOADING}
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
