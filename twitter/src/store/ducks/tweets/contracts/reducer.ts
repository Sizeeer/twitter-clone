import { Tweet } from "../../tweet/contracts/reducer";

export enum LOADING_STATE {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export enum FETCH_TWEET_STATE {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface TweetsState {
  items: Tweet[];
  loadingState: LOADING_STATE;
  fetchTweetState: FETCH_TWEET_STATE;
}
