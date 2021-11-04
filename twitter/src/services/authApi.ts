import {
  AuthorizedUserInterface,
  UserState,
} from "../store/ducks/user/contracts/reducer";
import { axios } from "../utils/axios";
import { LoginFormData } from "./../pages/SignIn/components/LoginModal";
import { RegistrationFormData } from "./../pages/SignIn/components/RegistrationModal";
import { UserInterface } from "./../store/ducks/user/contracts/reducer";

interface Response<T> {
  status: string;
  data: T;
}

export const AuthApi = {
  signIn(data: LoginFormData): Promise<AuthorizedUserInterface> {
    return axios
      .post<Response<AuthorizedUserInterface>>("/auth/login", data)
      .then(({ data }) => data.data);
  },
  signUp(data: RegistrationFormData): Promise<UserInterface> {
    return axios
      .post<Response<UserInterface>>("/auth/register", data)
      .then(({ data }) => data.data);
  },
  getMe(): Promise<UserState["data"]> {
    return axios
      .get<Response<UserState["data"]>>("/users/me")
      .then(({ data }) => data.data);
  },
};
