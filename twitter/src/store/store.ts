import { NotificationInterface } from "./ducks/notification/contracts/reducer";
import { UserState } from "./ducks/user/contracts/reducer";
import { TweetState } from "./ducks/tweet/contracts/reducer";
import { TweetsState } from "./ducks/tweets/contracts/reducer";

import { rootReducer } from "./rootReducer";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import { TopicsState } from "./ducks/topics/contracts/reducer";
import { RecommendationState } from "./ducks/recommendation/contracts/reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  tweets: TweetsState;
  tweet: TweetState;
  topics: TopicsState;
  user: UserState;
  recommendation: RecommendationState;
  notification: NotificationInterface;
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
