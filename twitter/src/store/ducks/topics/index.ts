import {  TopicsActions, TOPICS_ACTION_TYPES } from './contracts/actionCreators';
import { LOADING_STATE, TopicsState } from './contracts/reducer';
import produce, { Draft } from 'immer'

const initialValues: TopicsState = {
  items: [],
  loadingState: LOADING_STATE.NEVER
}

export const topicsReducer = produce((draft: Draft<TopicsState>, action: TopicsActions) => {

  switch (action.type){
    
    case TOPICS_ACTION_TYPES.SET_TOPICS: 
      draft.items = action.payload
      draft.loadingState = LOADING_STATE.LOADED
      break
    
    case TOPICS_ACTION_TYPES.FETCH_TOPICS: 
      draft.items = []
      draft.loadingState = LOADING_STATE.LOADING
      break

    case TOPICS_ACTION_TYPES.SET_LOADING_STATE: 
      draft.loadingState = action.payload
      break
    

    default: 
      break
    
  }

}, initialValues)