import { NotificationInterface } from "./contracts/reducer";
import { RootState } from "../../store";

export const selectNotification = (state: RootState): NotificationInterface =>
  state.notification;
