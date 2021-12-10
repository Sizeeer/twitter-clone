// import { Action } from "redux";
// import { Tweet } from "../../tweet/contracts/reducer";
// import { FETCH_TWEET_STATE, TweetsState } from "./reducer";

// export enum TWEETS_ACTION_TYPES {
//   SET_TWEETS = "TWEETS/SET_TWEETS",
//   ADD_TWEET = "TWEETS/ADD_TWEET",
//   FETCH_TWEETS = "TWEETS/FETCH_TWEETS",
//   SET_LOADING_STATE = "TWEETS/SET_LOADING_STATE",
//   FETCH_TWEET = "TWEETS/FETCH_TWEET",
//   SET_FETCH_TWEET_STATE = "TWEETS/SET_FETCH_TWEET_STATE",
//   DELETE_TWEET = "TWEETS/DELETE_TWEET",
// }

// export interface SetTweetsActionInterface extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.SET_TWEETS;
//   payload: TweetsState["items"];
// }

// export interface FetchTweetsActionInterface
//   extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.FETCH_TWEETS;
// }

// export interface SetLoadingStateActionInterface
//   extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.SET_LOADING_STATE;
//   payload: TweetsState["loadingState"];
// }

// export interface SetFetchTweetStateActionInterface
//   extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.SET_FETCH_TWEET_STATE;
//   payload: FETCH_TWEET_STATE;
// }

// export interface FetchTweetActionInterface extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.FETCH_TWEET;
//   text: string;
//   urls: string[];
//   tags: string[];
// }

// export interface AddTweetActionInterface extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.ADD_TWEET;
//   payload: Tweet | Tweet;
// }

// export interface DeleteTweetActionInterface
//   extends Action<TWEETS_ACTION_TYPES> {
//   type: TWEETS_ACTION_TYPES.DELETE_TWEET;
//   payload: string;
// }
