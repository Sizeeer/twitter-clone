import { SuccessResponse } from "../../../shared/types/communicationTypes";
import { UserAttributes } from "../shared/types/userTypes";
import { axios } from "../utils/axios";
import { UpdateUserData } from "./../../../shared/types/userTypes";

interface IUserAPI {
  subscribe: (userId: string) => Promise<string | undefined>;
  unsubscribe: (userId: string) => Promise<string | undefined>;
  update: (body: UpdateUserData) => Promise<UserAttributes | undefined>;
  getSubscribers: () => Promise<UserAttributes[] | undefined>;
  getSubscriptions: () => Promise<UserAttributes[] | undefined>;
  getUserData: (userId: string) => Promise<UserAttributes | undefined>;
  me: () => Promise<UserAttributes | undefined>;
}

export const UserApi: IUserAPI = {
  subscribe(userId) {
    return axios
      .post<SuccessResponse<string>>(`/users/subscribe/${userId}`)
      .then(({ data }) => {
        return data.data;
      });
  },
  unsubscribe(userId) {
    return axios
      .post<SuccessResponse<string>>(`/users/unsubscribe/${userId}`)
      .then(({ data }) => {
        return data.data;
      });
  },
  update(body) {
    return axios
      .put<SuccessResponse<UserAttributes>>("/users/update", body)
      .then(({ data }) => {
        return data.data;
      });
  },
  getSubscribers() {
    return axios
      .get<SuccessResponse<UserAttributes[]>>("/users/subscribers")
      .then(({ data }) => {
        return data.data;
      });
  },
  getSubscriptions() {
    return axios
      .get<SuccessResponse<UserAttributes[]>>("/users/subscriptions")
      .then(({ data }) => {
        return data.data;
      });
  },
  getUserData(userId) {
    return axios
      .get<SuccessResponse<UserAttributes>>(`/users/${userId}`)
      .then(({ data }) => {
        return data.data;
      });
  },
  me() {
    return axios
      .get<SuccessResponse<UserAttributes>>(`/users/me`)
      .then(({ data }) => {
        return data.data;
      });
  },
};
