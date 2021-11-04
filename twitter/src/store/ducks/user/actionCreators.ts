import { RegistrationFormData } from "../../../pages/SignIn/components/RegistrationModal";
import { LoginFormData } from "./../../../pages/SignIn/components/LoginModal";
import {
  FetchRegisterActionInterface,
  FetchUserActionInterface,
  FetchUserDataActionInterface,
  LikeTweetActionInterface,
  LogoutActionInterface,
  RetweetActionInterface,
  RetweetWithoutSagaActionInterface,
  SetUserActionInterface,
  SetUserLoadingStateActionInterface,
  UnlikeTweetActionInterface,
  UnretweetTweetActionInterface,
  USER_ACTION_TYPES,
} from "./contracts/actionTypes";
import { UserState } from "./contracts/reducer";

export const setUserAction = (
  payload: UserState["data"]
): SetUserActionInterface => ({
  type: USER_ACTION_TYPES.SET_USER,
  payload,
});

export const fetchUserAction = (
  payload: LoginFormData
): FetchUserActionInterface => ({
  type: USER_ACTION_TYPES.FETCH_USER,
  payload,
});

export const fetchRegisterDataAction = (
  payload: RegistrationFormData
): FetchRegisterActionInterface => ({
  type: USER_ACTION_TYPES.FETCH_REGISTER,
  payload,
});

export const fetchUserDataAction = (): FetchUserDataActionInterface => ({
  type: USER_ACTION_TYPES.FETCH_USER_DATA,
});

export const setLoadingStateAction = (
  payload: UserState["loadingState"]
): SetUserLoadingStateActionInterface => ({
  type: USER_ACTION_TYPES.SET_USER_LOADING_STATE,
  payload,
});

export const logoutAction = (): LogoutActionInterface => ({
  type: USER_ACTION_TYPES.LOGOUT,
});

export const likeTweetAction = (payload: string): LikeTweetActionInterface => ({
  type: USER_ACTION_TYPES.LIKE_TWEET,
  payload,
});

export const unlikeTweetAction = (
  payload: string
): UnlikeTweetActionInterface => ({
  type: USER_ACTION_TYPES.UNLIKE_TWEET,
  payload,
});

export const retweetWithoutSagaAction = (
  payload: string
): RetweetWithoutSagaActionInterface => ({
  type: USER_ACTION_TYPES.RETWEET_WITHOUT_SAGA,
  payload,
});

export const retweetAction = (payload: string): RetweetActionInterface => ({
  type: USER_ACTION_TYPES.RETWEET,
  payload,
});

export const unretweetAction = (
  payload: string,
  parentKey: string
): UnretweetTweetActionInterface => ({
  type: USER_ACTION_TYPES.UNRETWEET,
  payload,
  parentKey,
});

export type UserActions =
  | SetUserActionInterface
  | FetchUserActionInterface
  | SetUserLoadingStateActionInterface
  | FetchRegisterActionInterface
  | FetchUserDataActionInterface
  | LikeTweetActionInterface
  | UnlikeTweetActionInterface
  | RetweetActionInterface
  | UnretweetTweetActionInterface
  | RetweetWithoutSagaActionInterface;
