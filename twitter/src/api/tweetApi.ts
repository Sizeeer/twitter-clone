import { Status } from "../shared/types/communicationTypes";
import { CreateTweetBody, TweetAttributes } from "../shared/types/tweetTypes";

import { axios } from "../utils/axios";
export interface SuccessResponse<T = void> {
  status: Status.SUCCESS;
  data?: T;
}
interface Tweets {
  liked: TweetAttributes[] | undefined;
  personal: TweetAttributes[] | undefined;
  subscriptions: TweetAttributes[] | undefined;
}
interface ITweetAPI {
  like: (tweetId: string) => void;
  unlike: (tweetId: string) => void;
  retweet: (tweetId: string) => void;
  create: (body: CreateTweetBody) => Promise<TweetAttributes | undefined>;
  delete: (tweetId: string) => void;
  getLikedTweets: () => Promise<TweetAttributes[] | undefined>;
  getPersonalTweets: () => Promise<TweetAttributes[] | undefined>;
  getSubscriptionsTweets: (
    days?: number
  ) => Promise<TweetAttributes[] | undefined>;
  getTweets: (days?: number) => Promise<Tweets | undefined>;
  getCurrentTweet: (tweetId: string) => Promise<TweetAttributes | undefined>;
}

export const TweetApi: ITweetAPI = {
  like(tweetId) {
    return axios.post<SuccessResponse>(`/tweets/like/${tweetId}`);
  },
  unlike(tweetId) {
    return axios.post<SuccessResponse>(`/tweets/unlike/${tweetId}`);
  },
  retweet(tweetId) {
    return axios.post<SuccessResponse>(`/tweets/retweet/${tweetId}`);
  },
  create(body) {
    return axios
      .post<SuccessResponse<TweetAttributes>>("/tweets/create/", body)
      .then(({ data }) => {
        return data.data;
      });
  },
  delete(tweetId) {
    return axios.delete<SuccessResponse>(`/tweets/delete/${tweetId}`);
  },
  getLikedTweets() {
    return axios
      .get<SuccessResponse<TweetAttributes[]>>("/tweets/liked")
      .then(({ data }) => {
        return data.data;
      });
  },
  getPersonalTweets() {
    return axios
      .get<SuccessResponse<TweetAttributes[]>>("/tweets/personal")
      .then(({ data }) => {
        return data.data;
      });
  },
  getSubscriptionsTweets(days) {
    return axios
      .get<SuccessResponse<TweetAttributes[]>>(
        `/tweets/subscriptions?days=${days}`
      )
      .then(({ data }) => {
        return data.data;
      });
  },
  getTweets(days) {
    return axios
      .get<SuccessResponse<Tweets>>(`/tweets/?days=${days}`)
      .then(({ data }) => {
        return data.data;
      });
  },
  getCurrentTweet(tweetId) {
    return axios
      .get<SuccessResponse<TweetAttributes>>(`/tweets/${tweetId}`)
      .then(({ data }) => {
        return data.data;
      });
  },
};
