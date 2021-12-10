// import { Tweet } from "../tweet/contracts/reducer";
// import {
//   FetchTweetsActionInterface,
//   FetchTweetActionInterface,
//   SetLoadingStateActionInterface,
//   SetFetchTweetStateActionInterface,
//   SetTweetsActionInterface,
//   TWEETS_ACTION_TYPES,
//   AddTweetActionInterface,
//   DeleteTweetActionInterface,
// } from "./contracts/actionTypes";
// import { TweetsState, FETCH_TWEET_STATE } from "./contracts/reducer";

// export const setTweetsAction = (
//   payload: TweetsState["items"]
// ): SetTweetsActionInterface => ({
//   type: TWEETS_ACTION_TYPES.SET_TWEETS,
//   payload,
// });

// export const fetchTweetsAction = (): FetchTweetsActionInterface => ({
//   type: TWEETS_ACTION_TYPES.FETCH_TWEETS,
// });

// export const setLoadingStateAction = (
//   payload: TweetsState["loadingState"]
// ): SetLoadingStateActionInterface => ({
//   type: TWEETS_ACTION_TYPES.SET_LOADING_STATE,
//   payload,
// });

// export const setFetchTweetStateAction = (
//   payload: FETCH_TWEET_STATE
// ): SetFetchTweetStateActionInterface => ({
//   type: TWEETS_ACTION_TYPES.SET_FETCH_TWEET_STATE,
//   payload,
// });

// export const fetchTweetStateAction = (
//   text: string,
//   urls: string[],
//   tags: string[]
// ): FetchTweetActionInterface => ({
//   type: TWEETS_ACTION_TYPES.FETCH_TWEET,
//   text,
//   urls,
//   tags,
// });

// export const addTweetAction = (
//   payload: Tweet | Tweet
// ): AddTweetActionInterface => ({
//   type: TWEETS_ACTION_TYPES.ADD_TWEET,
//   payload,
// });

// export const deleteTweetAction = (
//   payload: string
// ): DeleteTweetActionInterface => ({
//   type: TWEETS_ACTION_TYPES.DELETE_TWEET,
//   payload,
// });

// export type TweetsActions =
//   | SetTweetsActionInterface
//   | FetchTweetsActionInterface
//   | SetLoadingStateActionInterface
//   | FetchTweetActionInterface
//   | AddTweetActionInterface
//   | SetFetchTweetStateActionInterface
//   | DeleteTweetActionInterface;
