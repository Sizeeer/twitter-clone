import {
  DeleteTweetActionInterface,
  FetchTweetActionInterface,
  TWEETS_ACTION_TYPES,
} from "./contracts/actionTypes";

import { call, takeLatest, put, takeEvery } from "redux-saga/effects";
import { TweetsApi } from "./../../../services/tweetsApi";
import { LOADING_STATE, FETCH_TWEET_STATE } from "./contracts/reducer";
import {
  setTweetsAction,
  setLoadingStateAction,
  addTweetAction,
  setFetchTweetStateAction,
} from "./actionCreators";
import { Tweet } from "../tweet/contracts/reducer";

export function* fetchTweetsRequest() {
  try {
    const data: Tweet[] = yield call(TweetsApi.fetchTweets);
    yield put(setTweetsAction(data));
  } catch (e) {
    yield put(setLoadingStateAction(LOADING_STATE.ERROR));
  }
}

export function* fetchTweetRequest({
  text,
  urls,
  tags,
}: FetchTweetActionInterface) {
  try {
    const payload = { text, urls, tags };

    const data: Tweet = yield call(TweetsApi.addTweet, payload);

    yield put(addTweetAction(data));
  } catch (e) {
    yield put(setFetchTweetStateAction(FETCH_TWEET_STATE.ERROR));
  }
}

export function* deleteTweetRequest({
  payload: id,
}: DeleteTweetActionInterface) {
  try {
    yield call(TweetsApi.deleteTweet, id);
  } catch (e) {
    console.log(123);

    yield put(setFetchTweetStateAction(FETCH_TWEET_STATE.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeLatest(TWEETS_ACTION_TYPES.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TWEETS_ACTION_TYPES.FETCH_TWEET, fetchTweetRequest);
  yield takeEvery(TWEETS_ACTION_TYPES.DELETE_TWEET, deleteTweetRequest);
}
