import { selectUserData } from "./../user/selectors";
import { RootState } from "./../../store";
import {
  LOADING_STATE,
  TweetsState,
  FETCH_TWEET_STATE,
} from "./contracts/reducer";
import { createSelector } from "reselect";

const selectTweets = (state: RootState): TweetsState => state.tweets;
export const selectFetchTweetState = (state: RootState): FETCH_TWEET_STATE =>
  selectTweets(state).fetchTweetState;

export const selectTweetsItems = createSelector(
  selectTweets,
  (tweets) => tweets.items
);

export const selectMyTweetsItems = (state: RootState) =>
  state.tweets.items.filter(
    (el) =>
      (el.whoRetweeted || el.user.username) === selectUserData(state)?.username
  );
export const selectLoadingState = (state: RootState) =>
  selectTweets(state).loadingState === LOADING_STATE.LOADING;
export const selectError = (state: RootState) =>
  selectTweets(state).loadingState === LOADING_STATE.ERROR;
