import { notificationReducer } from "./notification/notificationSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { currentUserReducer } from "./currentUser/currentUserSlice";
import { usersReducer } from "./users/usersSlice";

export const rootReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  auth: authReducer,
  notification: notificationReducer,
});
