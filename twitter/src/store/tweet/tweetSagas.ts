// import { call, takeLatest, put } from "redux-saga/effects";
// import { TweetsApi } from "../../../api/tweetApi";
// import {
//   FetchTweetActionInterface,
//   TWEET_ACTION_TYPES,
// } from "./contracts/actionCreators";
// import { LOADING_STATE, TweetState } from "./contracts/reducer";
// import {
//   setTweetDataAction,
//   setLoadingStateAction,
// } from "./contracts/actionCreators";

// export function* fetchTweetDataRequest({
//   payload: tweetId,
// }: FetchTweetActionInterface) {
//   try {
//     const data: TweetState["data"] = yield call(
//       TweetsApi.fetchTweetData,
//       tweetId
//     );

//     yield put(setTweetDataAction(data));
//   } catch (e) {
//     yield put(setLoadingStateAction(LOADING_STATE.ERROR));
//   }
// }

// export function* tweetSaga() {
//   yield takeLatest(TWEET_ACTION_TYPES.FETCH_TWEET, fetchTweetDataRequest);
// }
