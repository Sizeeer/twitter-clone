import { SuccessResponse } from "../../../shared/types/communicationTypes";
import { axios } from "../utils/axios";
import {
  UpdateUserData,
  UserAttributesUI,
} from "./../../../shared/types/userTypes";

interface IUserAPI {
  subscribe: (userId: string) => void;
  unsubscribe: (userId: string) => void;
  update: (body: UpdateUserData) => Promise<UserAttributesUI | undefined>;
  getSubscribers: () => Promise<UserAttributesUI[] | undefined>;
  getSubscriptions: () => Promise<UserAttributesUI[] | undefined>;
  getUserData: (userId: string) => Promise<UserAttributesUI | undefined>;
  me: () => Promise<UserAttributesUI | undefined>;
}

export const UserApi: IUserAPI = {
  subscribe(userId) {
    return axios.post<SuccessResponse>(`/users/subscribe/${userId}`);
  },
  unsubscribe(userId) {
    return axios.post<SuccessResponse>(`/users/unsubscribe/${userId}`);
  },
  update(body) {
    return axios
      .post<SuccessResponse<UserAttributesUI>>("/users/update", body)
      .then(({ data }) => {
        return data.data;
      });
  },
  getSubscribers() {
    return axios
      .get<SuccessResponse<UserAttributesUI[]>>("/users/subscribers")
      .then(({ data }) => {
        return data.data;
      });
  },
  getSubscriptions() {
    return axios
      .get<SuccessResponse<UserAttributesUI[]>>("/users/subscriptions")
      .then(({ data }) => {
        return data.data;
      });
  },
  getUserData(userId) {
    return axios
      .get<SuccessResponse<UserAttributesUI>>(`/users/${userId}`)
      .then(({ data }) => {
        return data.data;
      });
  },
  me() {
    return axios
      .get<SuccessResponse<UserAttributesUI>>(`/users/me`)
      .then(({ data }) => {
        return data.data;
      });
  },
};
