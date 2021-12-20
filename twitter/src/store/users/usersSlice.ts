import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";
import { Status } from "../../shared/types/communicationTypes";

import { UserAttributes } from "../../shared/types/userTypes";

interface UserState {
  subscriptions: {
    count: number;
    data: UserAttributes[];
  };
  subscribers: {
    count: number;
    data: UserAttributes[];
  };
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  subscriptions: {
    count: 0,
    data: [],
  },
  subscribers: {
    count: 0,
    data: [],
  },
  status: Status.SUCCESS,
  error: null,
};

const getSubscribers = createAsyncThunk(
  "users/getSubscribers",
  async (thunkApi) => {
    try {
      const subscribers = await UserApi.getSubscribers();
      return subscribers;
    } catch (error) {
      //@ts-ignore
      throw thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // subscribe: (state, { payload }: PayloadAction<string>) => {
    //   state.subscriptions.push(payload);
    // },
    // unsubscribe: (state, { payload }: PayloadAction<string>) => {
    //   state.subscriptions = state.subscriptions.filter(
    //     (el) => el.userId !== payload
    //   );
    // },
  },
  extraReducers: {
    [getSubscribers.fulfilled.type]: (
      state,
      { payload }: PayloadAction<UserAttributes[]>
    ) => {
      state.subscribers.data = payload;
    },
  },
});

// export const { subscribe, unsubscribe } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

// export const userReducer = produce(
//   (draft: Draft<UserState>, action: UserActions) => {
//     switch (action.type) {
//       case USER_ACTION_TYPES.SET_USER:
//         draft.data = action.payload;
//         draft.loadingState = USER_LOADING_STATE.SUCCESS;
//         break;

//       case USER_ACTION_TYPES.FETCH_USER:
//         draft.loadingState = USER_LOADING_STATE.LOADING;
//         break;

//       case USER_ACTION_TYPES.FETCH_REGISTER:
//         draft.loadingState = USER_LOADING_STATE.LOADING;
//         break;

//       case USER_ACTION_TYPES.SET_USER_LOADING_STATE:
//         draft.loadingState = action.payload;
//         break;

//       case USER_ACTION_TYPES.LIKE_TWEET:
//         if (draft.data && draft.data.likedTweets) {
//           draft.data.likedTweets.push(action.payload);
//         }
//         break;

//       case USER_ACTION_TYPES.UNLIKE_TWEET:
//         if (draft.data && draft.data.likedTweets) {
//           draft.data.likedTweets = draft.data.likedTweets.filter(
//             (tweetId) => tweetId !== action.payload
//           );
//         }
//         break;

//       case USER_ACTION_TYPES.RETWEET_WITHOUT_SAGA:
//         if (draft.data && draft.data.retweetedTweets) {
//           draft.data.retweetedTweets.push(action.payload);
//         }
//         break;

//       case USER_ACTION_TYPES.RETWEET:
//         if (draft.data && draft.data.retweetedTweets) {
//           draft.data.retweetedTweets.push(action.payload);
//         }
//         break;

//       case USER_ACTION_TYPES.UNRETWEET:
//         if (draft.data && draft.data.retweetedTweets) {
//           draft.data.retweetedTweets = draft.data.retweetedTweets.filter(
//             (tweetId) => tweetId !== action.payload
//           );
//           draft.data.retweetedTweets = draft.data.retweetedTweets.filter(
//             (tweetId) => tweetId !== action.parentKey
//           );
//         }
//         break;

//       default:
//         break;
//     }
//   },
//   initialValues
// );
