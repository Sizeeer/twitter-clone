import { TweetActions, TWEET_ACTION_TYPES } from "./contracts/actionCreators";
import { LOADING_STATE, TweetState } from "./contracts/reducer";
import produce, { Draft } from "immer";

const initialValues: TweetState = {
  data: undefined,
  loadingState: LOADING_STATE.NEVER,
};

export const tweetReducer = produce(
  (draft: Draft<TweetState>, action: TweetActions) => {
    switch (action.type) {
      case TWEET_ACTION_TYPES.SET_TWEET_DATA:
        draft.data = action.payload;
        draft.loadingState = LOADING_STATE.LOADED;
        break;

      case TWEET_ACTION_TYPES.FETCH_TWEET:
        draft.data = undefined;
        draft.loadingState = LOADING_STATE.LOADING;
        break;

      case TWEET_ACTION_TYPES.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;

      default:
        break;
    }
  },
  initialValues
);
