import { NotificationReducer } from "./ducks/notification/reducer";
import { recommendationReducer } from "./ducks/recommendation/reducer";
import { userReducer } from "./ducks/user/reducer";
import { tweetReducer } from "./ducks/tweet/reducer";
import { combineReducers } from "redux";
import { tweetsReducer } from "./ducks/tweets/reducer";
import { topicsReducer } from "./ducks/topics";

export const rootReducer = combineReducers({
  tweets: tweetsReducer,
  tweet: tweetReducer,
  topics: topicsReducer,
  user: userReducer,
  recommendation: recommendationReducer,
  notification: NotificationReducer,
});
