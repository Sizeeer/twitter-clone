import { SuccessResponse } from "../../../shared/types/communicationTypes";
import {
  AuthorizedUserInterface,
  RegisterDataInterface,
  UserAttributes,
} from "../../../shared/types/userTypes";
import { LoginFormData } from "../pages/SignIn/components/LoginModal";
import { axios } from "../utils/axios";

interface IAuthAPI {
  login: (data: LoginFormData) => Promise<AuthorizedUserInterface | undefined>;
  register: (body: RegisterDataInterface) => void;
}

export const AuthApi: IAuthAPI = {
  login(body) {
    return axios
      .post<SuccessResponse<AuthorizedUserInterface>>("/auth/login", body)
      .then(({ data }) => data.data);
  },
  register(body) {
    return axios.post<SuccessResponse>("/auth/register", body);
  },
};
