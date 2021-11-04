import { Action } from 'redux';
import { TopicsState } from './reducer';

export enum TOPICS_ACTION_TYPES {
  SET_TOPICS = 'TOPICS/SET_TOPICS',
  FETCH_TOPICS = "TOPICS/FETCH_TOPICS",
  SET_LOADING_STATE = 'TOPICS/SET_LOADING_STATE'
}

interface SetTopicsActionInterface extends Action<TOPICS_ACTION_TYPES> {
  type: TOPICS_ACTION_TYPES.SET_TOPICS,
  payload: TopicsState['items']
}

interface FetchTopicsActionInterface extends Action<TOPICS_ACTION_TYPES> {
  type: TOPICS_ACTION_TYPES.FETCH_TOPICS,
}

interface SetLoadingStateActionInterface extends Action<TOPICS_ACTION_TYPES> {
  type: TOPICS_ACTION_TYPES.SET_LOADING_STATE,
  payload: TopicsState['loadingState']
}

export const setTopicsAction = (payload: TopicsState['items']): SetTopicsActionInterface => ({
  type: TOPICS_ACTION_TYPES.SET_TOPICS,
  payload
})

export const fetchTopicsAction = (): FetchTopicsActionInterface => ({
  type: TOPICS_ACTION_TYPES.FETCH_TOPICS,
})

export const setLoadingStateAction = (payload: TopicsState['loadingState']): SetLoadingStateActionInterface => ({
  type: TOPICS_ACTION_TYPES.SET_LOADING_STATE,
  payload
})

export type TopicsActions = SetTopicsActionInterface | FetchTopicsActionInterface | SetLoadingStateActionInterface