import { all } from "redux-saga/effects";
import { tweetsSaga } from "./ducks/tweets/tweetSagas";
import { topicsSaga } from "./ducks/topics/topicsSagas";
import { tweetSaga } from "./ducks/tweet/tweetSagas";
import { userSaga } from "./ducks/user/userSaga";
import { recommendationSaga } from "./ducks/recommendation/recommendationSagas";

export function* rootSaga() {
  yield all([
    tweetsSaga(),
    tweetSaga(),
    topicsSaga(),
    userSaga(),
    recommendationSaga(),
  ]);
}
