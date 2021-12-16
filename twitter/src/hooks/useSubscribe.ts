import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { queryClient } from "..";

import { UserApi } from "../api/userApi";
import { setNotification } from "../store/notification/notificationSlice";

export const useSubscribe = () => {
  const dispatch = useDispatch();

  const { mutate: subscribe } = useMutation(
    //@ts-ignore
    (userId: string) => {
      return UserApi.unsubscribe(userId);
    },
    {
      onSuccess: (data: string) => {
        dispatch(
          setNotification({
            message: `Вы подписались на @${data}`,
            type: "error",
          })
        );
      },
      onError: () => {
        dispatch(
          setNotification({
            message: "Произошла ошибка. Повторите попытку",
            type: "error",
          })
        );
      },
    }
  );

  const { mutate: unsubscribe } = useMutation(
    //@ts-ignore
    (userId: string) => {
      return UserApi.unsubscribe(userId);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("tweets");
        dispatch(
          setNotification({
            message: `Вы отписались от @${data}`,
            type: "success",
          })
        );
      },
      onError: () => {
        dispatch(
          setNotification({
            message: "Произошла ошибка при удалении. Повторите попытку",
            type: "error",
          })
        );
      },
    }
  );

  return { subscribe, unsubscribe };
};
