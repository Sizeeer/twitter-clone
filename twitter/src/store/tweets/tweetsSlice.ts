import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TweetAttributes } from "../../shared/types/tweetTypes";

// import { subscribe } from "../users/usersSlice";

interface Tweets {
  data: TweetAttributes[];
  // status: Status;
  // error: string | null;
}

const initialState: Tweets = {
  data: [],
  // status: Status.SUCCESS,
  // error: null,
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweet: (state, { payload }: PayloadAction<TweetAttributes>) => {
      state.data.push(payload);
    },
  },
});

export const { addTweet } = tweetsSlice.actions;
export const tweetsReducer = tweetsSlice.reducer;
