import {
  SetLoadingStateActionInterface,
  SetRecommendationActionInterface,
  FetchRecommendationActionInterface,
  RECOMMENDATION_ACTION_TYPES,
} from "./contracts/actionTypes";
import { RecommendationState } from "./contracts/reducer";

export const setRecommendationDataAction = (
  payload: RecommendationState["data"] | undefined
): SetRecommendationActionInterface => ({
  type: RECOMMENDATION_ACTION_TYPES.SET_RECOMMENDATION_DATA,
  payload,
});

export const setLoadingStateAction = (
  payload: RecommendationState["loadingState"]
): SetLoadingStateActionInterface => ({
  type: RECOMMENDATION_ACTION_TYPES.SET_LOADING_STATE,
  payload,
});

export const fetchRecommendationAction =
  (): FetchRecommendationActionInterface => ({
    type: RECOMMENDATION_ACTION_TYPES.FETCH_RECOMMENDATION,
  });
