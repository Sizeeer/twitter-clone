import { call, takeLatest, put } from "redux-saga/effects";
import { RecommendationApi } from "../../../services/recommendationApi";
import {
  setLoadingStateAction,
  setRecommendationDataAction,
} from "./actionCreators";
import { RECOMMENDATION_ACTION_TYPES } from "./contracts/actionTypes";
import { LOADING_STATE, RecommendationData } from "./contracts/reducer";
//TODO
//Добавить типизацию в получение рекомендованных
export function* fetchRecommendationDataRequest() {
  try {
    const data: RecommendationData[] = yield call(
      RecommendationApi.getRecommendationData
    );

    yield put(setRecommendationDataAction(data));
  } catch (e) {
    yield put(setLoadingStateAction(LOADING_STATE.ERROR));
  }
}

export function* recommendationSaga() {
  yield takeLatest(
    RECOMMENDATION_ACTION_TYPES.FETCH_RECOMMENDATION,
    fetchRecommendationDataRequest
  );
}
