import {
  LikedTweetAttributes,
  PersonalTweetAttributes,
  SubscriptionTweetAttributes,
} from "./../shared/types/tweetTypes";
import { Status } from "../shared/types/communicationTypes";
import { CreateTweetBody, TweetAttributes } from "../shared/types/tweetTypes";

import { axios } from "../utils/axios";
export interface SuccessResponse<T = void> {
  status: Status.SUCCESS;
  data?: T;
}
interface Tweets {
  liked: {
    tweets: TweetAttributes[] | undefined;
    nextOffset: number;
  };
  personal: {
    tweets: TweetAttributes[] | undefined;
    nextOffset: number;
  };
  subscriptions: {
    tweets: TweetAttributes[] | undefined;
    nextOffset: number;
  };
}
interface ITweetAPI {
  like: (tweetId: string) => void;
  unlike: (tweetId: string) => void;
  retweet: (tweetId: string) => void;
  unretweet: (tweetId: string) => void;
  create: (body: CreateTweetBody) => Promise<TweetAttributes | undefined>;
  delete: (tweetId: string) => void;
  getLikedTweets: (
    days?: number,
    limit?: number,
    page?: number,
    id?: string
  ) => Promise<LikedTweetAttributes[] | undefined>;
  getPersonalTweets: (
    days?: number,
    limit?: number,
    page?: number,
    id?: string
  ) => Promise<PersonalTweetAttributes[] | undefined>;
  getSubscriptionsTweets: (
    days?: number,
    limit?: number,
    page?: number
  ) => Promise<SubscriptionTweetAttributes[] | undefined>;
  getTweets: (
    days?: number,
    limit?: number,
    page?: number
  ) => Promise<Tweets | undefined>;
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
  unretweet(tweetId) {
    return axios.post<SuccessResponse>(`/tweets/unretweet/${tweetId}`);
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
  getLikedTweets(days, limit, page, id) {
    return axios
      .get<SuccessResponse<TweetAttributes[]>>(
        `/tweets/liked?days=${days}&limit=${limit}&page=${page}&id=${id}`
      )
      .then(({ data }) => {
        return data.data;
      });
  },
  getPersonalTweets(days, limit, page, id) {
    return axios
      .get<SuccessResponse<TweetAttributes[]>>(
        `/tweets/personal?days=${days}&limit=${limit}&page=${page}&id=${id}`
      )
      .then(({ data }) => {
        return data.data;
      });
  },
  getSubscriptionsTweets(days, limit, page) {
    return axios
      .get<SuccessResponse<TweetAttributes[]>>(
        `/tweets/subscriptions?days=${days}&limit=${limit}&page=${page}`
      )
      .then(({ data }) => {
        return data.data;
      });
  },
  getTweets(days, limit, page) {
    return axios
      .get<SuccessResponse<Tweets>>(
        `/tweets/?days=${days}&limit=${limit}&page=${page}`
      )
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
