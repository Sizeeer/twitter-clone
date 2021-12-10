import { LOADING_STATE, RecommendationState } from "./contracts/reducer";
import produce, { Draft } from "immer";
import {
  RecommendationActions,
  RECOMMENDATION_ACTION_TYPES,
} from "./contracts/actionTypes";

const initialValues: RecommendationState = {
  data: [],
  loadingState: LOADING_STATE.NEVER,
};

export const recommendationReducer = produce(
  (draft: Draft<RecommendationState>, action: RecommendationActions) => {
    switch (action.type) {
      case RECOMMENDATION_ACTION_TYPES.SET_RECOMMENDATION_DATA:
        draft.data = action.payload;
        draft.loadingState = LOADING_STATE.LOADED;
        break;

      case RECOMMENDATION_ACTION_TYPES.FETCH_RECOMMENDATION:
        draft.loadingState = LOADING_STATE.LOADING;
        break;

      case RECOMMENDATION_ACTION_TYPES.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;

      default:
        break;
    }
  },
  initialValues
);
