import { Action } from "redux";
import { TweetState } from "./reducer";

export enum TWEET_ACTION_TYPES {
  SET_TWEET_DATA = "TWEET/SET_TWEET",
  FETCH_TWEET = "TWEET/FETCH_TWEET",
  SET_LOADING_STATE = "TWEET/SET_LOADING_STATE",
}

interface SetTweetActionInterface extends Action<TWEET_ACTION_TYPES> {
  type: TWEET_ACTION_TYPES.SET_TWEET_DATA;
  payload: TweetState["data"];
}

export interface FetchTweetActionInterface extends Action<TWEET_ACTION_TYPES> {
  type: TWEET_ACTION_TYPES.FETCH_TWEET;
  payload: string;
}

interface SetLoadingStateActionInterface extends Action<TWEET_ACTION_TYPES> {
  type: TWEET_ACTION_TYPES.SET_LOADING_STATE;
  payload: TweetState["loadingState"];
}

export const setTweetDataAction = (
  payload: TweetState["data"]
): SetTweetActionInterface => ({
  type: TWEET_ACTION_TYPES.SET_TWEET_DATA,
  payload,
});

export const fetchTweetDataAction = (
  payload: string
): FetchTweetActionInterface => ({
  type: TWEET_ACTION_TYPES.FETCH_TWEET,
  payload,
});

export const setLoadingStateAction = (
  payload: TweetState["loadingState"]
): SetLoadingStateActionInterface => ({
  type: TWEET_ACTION_TYPES.SET_LOADING_STATE,
  payload,
});

export type TweetActions =
  | SetTweetActionInterface
  | FetchTweetActionInterface
  | SetLoadingStateActionInterface;
