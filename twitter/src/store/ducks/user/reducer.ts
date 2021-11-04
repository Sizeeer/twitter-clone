import { USER_ACTION_TYPES } from "./contracts/actionTypes";
import { UserActions } from "./actionCreators";
import { UserState, USER_LOADING_STATE } from "./contracts/reducer";
import produce, { Draft } from "immer";

const initialValues: UserState = {
  data: undefined,
  loadingState: USER_LOADING_STATE.NEVER,
};

export const userReducer = produce(
  (draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
      case USER_ACTION_TYPES.SET_USER:
        draft.data = action.payload;
        draft.loadingState = USER_LOADING_STATE.SUCCESS;
        break;

      case USER_ACTION_TYPES.FETCH_USER:
        draft.loadingState = USER_LOADING_STATE.LOADING;
        break;

      case USER_ACTION_TYPES.FETCH_REGISTER:
        draft.loadingState = USER_LOADING_STATE.LOADING;
        break;

      case USER_ACTION_TYPES.SET_USER_LOADING_STATE:
        draft.loadingState = action.payload;
        break;

      case USER_ACTION_TYPES.LIKE_TWEET:
        if (draft.data && draft.data.likedTweets) {
          draft.data.likedTweets.push(action.payload);
        }
        break;

      case USER_ACTION_TYPES.UNLIKE_TWEET:
        if (draft.data && draft.data.likedTweets) {
          draft.data.likedTweets = draft.data.likedTweets.filter(
            (tweetId) => tweetId !== action.payload
          );
        }
        break;

      case USER_ACTION_TYPES.RETWEET_WITHOUT_SAGA:
        if (draft.data && draft.data.retweetedTweets) {
          draft.data.retweetedTweets.push(action.payload);
        }
        break;

      case USER_ACTION_TYPES.RETWEET:
        if (draft.data && draft.data.retweetedTweets) {
          draft.data.retweetedTweets.push(action.payload);
        }
        break;

      case USER_ACTION_TYPES.UNRETWEET:
        if (draft.data && draft.data.retweetedTweets) {
          draft.data.retweetedTweets = draft.data.retweetedTweets.filter(
            (tweetId) => tweetId !== action.payload
          );
          draft.data.retweetedTweets = draft.data.retweetedTweets.filter(
            (tweetId) => tweetId !== action.parentKey
          );
        }
        break;

      default:
        break;
    }
  },
  initialValues
);
