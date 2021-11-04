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
import {
  fetchRegisterDataAction,
  fetchUserDataAction,
} from "../../../store/ducks/user/actionCreators";
import { withNotification } from "../../../hoc/withNotification";
import { selectUserLoadingState } from "../../../store/ducks/user/selectors";
import { USER_LOADING_STATE } from "../../../store/ducks/user/contracts/reducer";
import { Color } from "@material-ui/lab/Alert";
import { LOADING_STATE } from "../../../store/ducks/tweet/contracts/reducer";
import { selectNotification } from "../../../store/ducks/notification/selectors";

interface RegistrationModalInterface {
  isOpen: boolean;
  onClose: () => void;
  openNotification: (message: string, type: Color) => void;
}

export type RegistrationFormData = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  password2: string;
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Данное поле обязательно"),
  password: yup
    .string()
    .min(8, "Минимальная длинна 8 символов")
    .required("Данное поле обязательно"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Пароли не совпадают")
    .required("Данное поле обязательно"),
  fullname: yup.string().required("Введите ваше имя"),
  email: yup.string().email("Неверный email").required("Введите email"),
});

const RegistrationModal: React.FC<RegistrationModalInterface> = ({
  isOpen,
  onClose,
  openNotification,
}: RegistrationModalInterface): React.ReactElement => {
  const classes = useSignInStyles();
  const userLoadingState = useSelector(selectUserLoadingState);
  const notificationData = useSelector(selectNotification);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    dispatch(fetchRegisterDataAction(data));

    // reset({ username: "", password: "" });
  };

  React.useEffect(() => {
    if (notificationData.message) {
      openNotification(notificationData.message, notificationData.type);
    }
  }, [notificationData]);

  return (
    <DialogBox title="Зарегистрироваться" open={isOpen} onClose={onClose}>
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
                  type="text"
                  label="Логин"
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
              name="fullname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Имя"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.fullname?.message}
                  helperText={errors.fullname?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="E-mail"
                  variant="filled"
                  className={classes.loginSideDialogField}
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
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
              disabled={userLoadingState === USER_LOADING_STATE.LOADING}
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

export default withNotification(RegistrationModal);
