import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { TweetApi } from "../api/tweetApi";
import { setNotification } from "../store/notification/notificationSlice";

export const useDeleteTweet = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error } = useMutation(
    //@ts-ignore
    (tweetId: string) => {
      return TweetApi.delete(tweetId);
    },
    {
      onSuccess: () => {
        dispatch(
          setNotification({
            message: "Твит успешно удален",
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

  return { deleteTweet: mutate, isLoading, isError, error };
};
