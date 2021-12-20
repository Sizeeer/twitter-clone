import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { queryClient } from "..";
import { UserApi } from "../api/userApi";
import { setCurrentUser } from "../store/currentUser/currentUserSlice";
import { setNotification } from "../store/notification/notificationSlice";

export const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error } = useMutation(
    //@ts-ignore
    (body: UpdateUserBody) => {
      return UserApi.update(body);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["profile", data?.userId]);
        dispatch(setCurrentUser(data));

        dispatch(
          setNotification({
            message: "Профиль обновлен",
            type: "success",
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

  return { updateProfile: mutate, isLoading, isError, error };
};
