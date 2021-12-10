// import { RootState } from "../../store";

// const selectUser = (state: RootState): UserState => state.user;

// export const selectUserData = (
//   state: RootState
// ): UserState["data"] | undefined => selectUser(state).data;

// export const selectIsAuth = (state: RootState) => !!selectUserData(state);

// export const selectUserLoadingState = (state: RootState): USER_LOADING_STATE =>
//   selectUser(state).loadingState;

// export const selectIsLikedTweet =
//   (id: string) =>
//   (state: RootState): boolean =>
//     !!selectUserData(state)?.likedTweets.find((el) => el === id);

// export const selectIsRetweetedTweet =
//   (id: string) =>
//   (state: RootState): boolean =>
//     !!selectUserData(state)?.retweetedTweets.find((el) => el === id);
