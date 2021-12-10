import { RootState } from "./../store";

export const selectCurrentUserData = (state: RootState) =>
  state.currentUser.data;

export const selectCurrentUserStatus = (state: RootState) =>
  state.currentUser.status;
