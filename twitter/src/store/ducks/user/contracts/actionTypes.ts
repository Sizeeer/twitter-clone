import { LoginFormData } from "../../../../pages/SignIn/components/LoginModal";
import { Action } from "redux";
import { UserState, USER_LOADING_STATE } from "./reducer";
import { RegistrationFormData } from "../../../../pages/SignIn/components/RegistrationModal";

export enum USER_ACTION_TYPES {
  SET_USER = "USER/SET_USER",
  FETCH_USER = "USER/FETCH_USER",
  FETCH_REGISTER = "USER/FETCH_REGISTER",
  SET_USER_LOADING_STATE = "USER/SET_USER_LOADING_STATE",
  FETCH_USER_DATA = "USER/FETCH_USER_DATA",
  LOGOUT = "USER/LOGOUT",
  LIKE_TWEET = "USER/LIKE_TWEET",
  UNLIKE_TWEET = "USER/UNLIKE_TWEET",
  RETWEET_WITHOUT_SAGA = "User/RETWEET_WITHOUT_SAGA",
  RETWEET = "USER/RETWEET",
  UNRETWEET = "USER/UNRETWEET",
}

export interface SetUserActionInterface extends Action<USER_ACTION_TYPES> {
  type: USER_ACTION_TYPES.SET_USER;
  payload: UserState["data"];
}

export interface FetchUserActionInterface extends Action<USER_ACTION_TYPES> {
  type: USER_ACTION_TYPES.FETCH_USER;
  payload: LoginFormData;
}

export interface FetchRegisterActionInterface
  extends Action<USER_ACTION_TYPES> {
  type: USER_ACTION_TYPES.FETCH_REGISTER;
  payload: RegistrationFormData;
}

export interface FetchUserDataActionInterface
  extends Action<USER_ACTION_TYPES> {
  type: USER_ACTION_TYPES.FETCH_USER_DATA;
}

export interface SetUserLoadingStateActionInterface
  extends Action<USER_ACTION_TYPES> {
  type: USER_ACTION_TYPES.SET_USER_LOADING_STATE;
  payload: USER_LOADING_STATE;
}

export interface LikeTweetActionInterface {
  type: USER_ACTION_TYPES.LIKE_TWEET;
  payload: string;
}

export interface UnlikeTweetActionInterface {
  type: USER_ACTION_TYPES.UNLIKE_TWEET;
  payload: string;
}

export interface RetweetWithoutSagaActionInterface {
  type: USER_ACTION_TYPES.RETWEET_WITHOUT_SAGA;
  payload: string;
}

export interface RetweetActionInterface {
  type: USER_ACTION_TYPES.RETWEET;
  payload: string;
}

export interface UnretweetTweetActionInterface {
  type: USER_ACTION_TYPES.UNRETWEET;
  payload: string;
  parentKey: string;
}

export interface LogoutActionInterface extends Action<USER_ACTION_TYPES> {
  type: USER_ACTION_TYPES.LOGOUT;
}
