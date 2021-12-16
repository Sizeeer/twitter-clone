import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { queryClient } from "..";

import { UserApi } from "../api/userApi";
import { setNotification } from "../store/notification/notificationSlice";

export const useSubscribe = () => {
  const dispatch = useDispatch();

  const {
    mutate: subscribe,
    isLoading: isSubscribeLoading,
    isError: isSubscribeError,
  } = useMutation(
    //@ts-ignore
    (userId: string) => {
      return UserApi.subscribe(userId);
    },
    {
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

  const {
    mutate: unsubscribe,
    isLoading: isUnsubscribeLoading,
    isError: isUnsubscribeError,
  } = useMutation(
    //@ts-ignore
    (userId: string) => {
      return UserApi.unsubscribe(userId);
    },
    {
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

  return {
    subscribe,
    unsubscribe,
    isLoading: isSubscribeLoading || isUnsubscribeLoading,
    isError: isSubscribeError || isUnsubscribeError,
  };
};
