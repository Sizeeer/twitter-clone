import { Action } from "redux";
import { RecommendationState } from "./reducer";

export enum RECOMMENDATION_ACTION_TYPES {
  SET_RECOMMENDATION_DATA = "RECOMMENDATION/SET_RECOMMENDATION",
  FETCH_RECOMMENDATION = "RECOMMENDATION/FETCH_RECOMMENDATION",
  SET_LOADING_STATE = "RECOMMENDATION/SET_LOADING_STATE",
}

export interface SetRecommendationActionInterface
  extends Action<RECOMMENDATION_ACTION_TYPES> {
  type: RECOMMENDATION_ACTION_TYPES.SET_RECOMMENDATION_DATA;
  payload: RecommendationState["data"] | undefined;
}

export interface SetLoadingStateActionInterface
  extends Action<RECOMMENDATION_ACTION_TYPES> {
  type: RECOMMENDATION_ACTION_TYPES.SET_LOADING_STATE;
  payload: RecommendationState["loadingState"];
}

export interface FetchRecommendationActionInterface
  extends Action<RECOMMENDATION_ACTION_TYPES> {
  type: RECOMMENDATION_ACTION_TYPES.FETCH_RECOMMENDATION;
}

export type RecommendationActions =
  | SetRecommendationActionInterface
  | SetLoadingStateActionInterface
  | FetchRecommendationActionInterface;
