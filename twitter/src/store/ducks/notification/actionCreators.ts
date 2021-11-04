import { NotificationInterface } from "./contracts/reducer";
import {
  ClearNotificationActionInterface,
  NOTIFICATION_ACTION_TYPES,
  SetNotificationActionInterface,
} from "./contracts/actionTypes";

export const setNotificationAction = (
  payload: NotificationInterface
): SetNotificationActionInterface => ({
  type: NOTIFICATION_ACTION_TYPES.SET_NOTIFICATION,
  payload,
});

export const clearNotificationAction =
  (): ClearNotificationActionInterface => ({
    type: NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION,
  });

export type NotificationsActions =
  | SetNotificationActionInterface
  | ClearNotificationActionInterface;
