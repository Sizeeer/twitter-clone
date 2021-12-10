import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

// export interface RootState {
//   tweets: TweetsState;
//   tweet: TweetState;
//   topics: TopicsState;
//   user: UserState;
//   recommendation: RecommendationState;
//   notification: NotificationInterface;
// }

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
