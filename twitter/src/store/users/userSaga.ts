// import { TweetInterface } from "./../../../../server/types/tweetTypes";
// import { setNotificationAction } from "./../notification/actionCreators";
// import { AuthorizedUserInterface } from "./../../../../server/types/userTypes";
// import { call, put, takeLatest } from "@redux-saga/core/effects";
// import { AuthApi } from "../../../api/authApi";
// import {
//   retweetAction,
//   retweetWithoutSagaAction,
//   setLoadingStateAction,
//   setUserAction,
// } from "./actionCreators";
// import {
//   FetchRegisterActionInterface,
//   FetchUserActionInterface,
//   LikeTweetActionInterface,
//   RetweetActionInterface,
//   UnlikeTweetActionInterface,
//   UnretweetTweetActionInterface,
//   USER_ACTION_TYPES,
// } from "./contracts/actionTypes";
// import { UserState, USER_LOADING_STATE } from "./contracts/reducer";
// import { UserApi } from "../../../api/userApi";
// import { Tweet } from "../tweet/contracts/reducer";
// import { addTweetAction, deleteTweetAction } from "../tweets/actionCreators";

// export function* fetchUserRequest({ payload }: FetchUserActionInterface) {
//   try {
//     const data: AuthorizedUserInterface = yield call(AuthApi.signIn, payload);
//     window.localStorage.setItem("token", data.token);

//     yield put(setUserAction(data));
//     yield put(
//       setNotificationAction({
//         message: "Авторизация прошла успешно!",
//         type: "success",
//       })
//     );
//   } catch (e) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//     yield put(
//       setNotificationAction({
//         message: "Произошла ошибка!",
//         type: "error",
//       })
//     );
//   }
// }

// export function* fetchRegisterRequest({
//   payload,
// }: FetchRegisterActionInterface) {
//   try {
//     const data: UserState["data"] = yield call(AuthApi.signUp, payload);

//     yield put(setLoadingStateAction(USER_LOADING_STATE.SUCCESS));
//     yield put(
//       setNotificationAction({
//         message: "Регистрация прошла успешно!",
//         type: "success",
//       })
//     );
//   } catch (e) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//     yield put(
//       setNotificationAction({
//         message: "Произошла ошибка!",
//         type: "error",
//       })
//     );
//   }
// }

// export function* fetchUserData() {
//   try {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.LOADING));
//     const data: UserState["data"] = yield call(AuthApi.getMe);
//     yield put(setUserAction(data));
//   } catch (err) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//   }
// }

// export function* logout() {
//   try {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.LOADING));
//     window.localStorage.setItem("token", "");
//     yield put(setUserAction(undefined));
//     yield put(setLoadingStateAction(USER_LOADING_STATE.SUCCESS));
//   } catch (err) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//   }
// }

// export function* likeTweet({ payload }: LikeTweetActionInterface) {
//   try {
//     yield call(UserApi.likeTweet, payload);
//   } catch (err) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//   }
// }

// export function* unlikeTweet({ payload }: UnlikeTweetActionInterface) {
//   try {
//     yield call(UserApi.unlikeTweet, payload);
//   } catch (err) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//   }
// }

// export function* retweet({ payload }: RetweetActionInterface) {
//   try {
//     const data: Tweet = yield call(UserApi.retweet, payload);
//     yield put(retweetWithoutSagaAction(data._id));
//     yield put(addTweetAction(data));
//   } catch (err) {
//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//   }
// }

// export function* unretweet({ payload }: UnretweetTweetActionInterface) {
//   try {
//     yield call(UserApi.unretweet, payload);
//   } catch (err) {
//     console.log("1212");

//     yield put(setLoadingStateAction(USER_LOADING_STATE.ERROR));
//   }
// }

// export function* userSaga() {
//   yield takeLatest(USER_ACTION_TYPES.FETCH_USER, fetchUserRequest);
//   yield takeLatest(USER_ACTION_TYPES.FETCH_REGISTER, fetchRegisterRequest);
//   yield takeLatest(USER_ACTION_TYPES.FETCH_USER_DATA, fetchUserData);
//   yield takeLatest(USER_ACTION_TYPES.LOGOUT, logout);
//   yield takeLatest(USER_ACTION_TYPES.LIKE_TWEET, likeTweet);
//   yield takeLatest(USER_ACTION_TYPES.UNLIKE_TWEET, unlikeTweet);
//   yield takeLatest(USER_ACTION_TYPES.RETWEET, retweet);
//   yield takeLatest(USER_ACTION_TYPES.UNRETWEET, unretweet);
// }
