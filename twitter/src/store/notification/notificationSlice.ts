import { Color } from "@material-ui/lab/Alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  message: string;
  type: Color;
}

const initialState: Notification = {
  message: "",
  type: "success",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.message = payload.message;
      state.type = payload.type;
    },
    clearNotification: (state) => {
      state.message = "";
      state.type = "success";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
