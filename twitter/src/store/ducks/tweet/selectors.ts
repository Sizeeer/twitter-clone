import { RootState } from "../../store";
import { LOADING_STATE, TweetState } from "./contracts/reducer";

const selectTweet = (state: RootState): TweetState => state.tweet;

export const selectTweetData = (
  state: RootState
): TweetState["data"] | undefined => selectTweet(state).data;

export const selectLoadingState = (state: RootState): boolean =>
  selectTweet(state).loadingState === LOADING_STATE.LOADING;
