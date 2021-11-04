import { Action } from "redux";
import { NotificationInterface } from "./reducer";

export enum NOTIFICATION_ACTION_TYPES {
  SET_NOTIFICATION = "NOTIFICATION/SET_NOTIFICATION",
  CLEAR_NOTIFICATION = "NOTIFICATION/CLEAR_NOTIFICATION",
}

export interface SetNotificationActionInterface
  extends Action<NOTIFICATION_ACTION_TYPES> {
  type: NOTIFICATION_ACTION_TYPES.SET_NOTIFICATION;
  payload: NotificationInterface;
}

export interface ClearNotificationActionInterface
  extends Action<NOTIFICATION_ACTION_TYPES> {
  type: NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION;
}
