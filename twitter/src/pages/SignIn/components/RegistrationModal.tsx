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
import { login, register } from "../../../store/auth/authSlice";
import { withNotification } from "../../../hoc/withNotification";
import { selectNotification } from "../../../store/notification/selectors";
import { selectAuthStatus } from "../../../store/auth/selectors";
import { Status } from "../../../shared/types/communicationTypes";
import { RegisterDataInterface } from "../../../shared/types/userTypes";

interface RegistrationModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  login: yup.string().required("Данное поле обязательно"),
  name: yup.string().required("Введите ваше имя"),
  password: yup
    .string()
    .min(8, "Минимальная длинна 8 символов")
    .required("Данное поле обязательно"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Пароли не совпадают")
    .required("Данное поле обязательно"),
});

export const RegistrationModal = ({
  isOpen,
  onClose,
}: RegistrationModalInterface) => {
  const classes = useSignInStyles();
  const dispatch = useDispatch();

  const authStatus = useSelector(selectAuthStatus);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterDataInterface>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegisterDataInterface> = async (data) => {
    dispatch(register(data));
    reset({ login: "", name: "", password: "", password2: "" });
  };

  useEffect(() => {
    if (authStatus === Status.ERROR || authStatus === Status.SUCCESS) {
      onClose();
    }
  }, [authStatus, onClose]);

  return (
    <DialogBox title="Зарегистрироваться" open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="filled" component="fieldset" fullWidth>
          <FormGroup row>
            <Controller
              name="login"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Логин"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.login?.message}
                  helperText={errors.login?.message}
                />
              )}
            />

            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Имя"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
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

            <Controller
              name="password2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Повторите пароль"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.password2?.message}
                  helperText={errors.password2?.message}
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
              Зарегистрироваться
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </DialogBox>
  );
};
