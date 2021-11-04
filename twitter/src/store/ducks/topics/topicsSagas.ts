import { call, takeLatest, put } from 'redux-saga/effects';
import { TOPICS_ACTION_TYPES } from "./contracts/actionCreators"
import { TopicsState, LOADING_STATE } from './contracts/reducer';
import {setTopicsAction, setLoadingStateAction} from './contracts/actionCreators'
import { TopicsApi } from '../../../services/topicsApi';

export function* fetchTopicsRequest() {
  try{
    const data: TopicsState['items'] = yield call(TopicsApi.fetchTopics)
    yield put(setTopicsAction(data))
  }catch(e){
    yield put(setLoadingStateAction(LOADING_STATE.ERROR))
  }
 
}

export function* topicsSaga() {
  yield takeLatest(TOPICS_ACTION_TYPES.FETCH_TOPICS, fetchTopicsRequest)
}

