import { NOTIFICATION_ACTION_TYPES } from "./contracts/actionTypes";
import produce, { Draft } from "immer";
import { NotificationInterface } from "./contracts/reducer";
import { NotificationsActions } from "./actionCreators";

const initialValues: NotificationInterface = {
  message: "",
  type: "success",
};

export const NotificationReducer = produce(
  (draft: Draft<NotificationInterface>, action: NotificationsActions) => {
    switch (action.type) {
      case NOTIFICATION_ACTION_TYPES.SET_NOTIFICATION:
        draft.message = action.payload.message;
        draft.type = action.payload.type;
        break;

      case NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION:
        draft.message = "";
        draft.type = "success";
        break;

      default:
        break;
    }
  },
  initialValues
);
