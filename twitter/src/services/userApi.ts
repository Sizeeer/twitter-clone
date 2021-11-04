import { axios } from "../utils/axios";

export const UserApi = {
  likeTweet(id: string): Promise<void> {
    return axios.post(`/users/like/${id}`).then(({ data }) => data.data);
  },
  unlikeTweet(id: string): Promise<void> {
    return axios.post(`/users/unlike/${id}`).then(({ data }) => data.data);
  },
  retweet(id: string): Promise<void> {
    return axios.post(`/users/retweet/${id}`).then(({ data }) => data.data);
  },
  unretweet(id: string): Promise<void> {
    return axios.post(`/users/unretweet/${id}`);
  },
};
