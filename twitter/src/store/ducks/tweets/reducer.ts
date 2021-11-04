import { TweetsActions } from "./actionCreators";
import {
  FETCH_TWEET_STATE,
  LOADING_STATE,
  TweetsState,
} from "./contracts/reducer";
import produce, { Draft } from "immer";
import { TWEETS_ACTION_TYPES } from "./contracts/actionTypes";

const initialValues: TweetsState = {
  items: [],
  loadingState: LOADING_STATE.NEVER,
  fetchTweetState: FETCH_TWEET_STATE.NEVER,
};

export const tweetsReducer = produce(
  (draft: Draft<TweetsState>, action: TweetsActions) => {
    switch (action.type) {
      case TWEETS_ACTION_TYPES.SET_TWEETS:
        draft.items = action.payload;
        draft.loadingState = LOADING_STATE.LOADED;
        break;

      case TWEETS_ACTION_TYPES.FETCH_TWEETS:
        draft.items = [];
        draft.loadingState = LOADING_STATE.LOADING;
        break;

      case TWEETS_ACTION_TYPES.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;

      case TWEETS_ACTION_TYPES.FETCH_TWEET:
        draft.fetchTweetState = FETCH_TWEET_STATE.LOADING;
        break;

      case TWEETS_ACTION_TYPES.ADD_TWEET:
        draft.items.unshift(action.payload);
        draft.fetchTweetState = FETCH_TWEET_STATE.NEVER;
        break;
      case TWEETS_ACTION_TYPES.SET_FETCH_TWEET_STATE:
        draft.fetchTweetState = action.payload;
        break;
      case TWEETS_ACTION_TYPES.DELETE_TWEET:
        draft.items = draft.items.filter((el) => el._id !== action.payload);
        break;

      default:
        break;
    }
  },
  initialValues
);
