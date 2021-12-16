import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { queryClient } from "../../..";
import { TweetApi } from "../../../api/tweetApi";
import { setNotification } from "../../../store/notification/notificationSlice";

export const useDeleteTweet = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error } = useMutation(
    //@ts-ignore
    (tweetId: string) => {
      return TweetApi.delete(tweetId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tweets");
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

  return { deleteTweet: mutate, isDeleteLoading: isLoading, isError, error };
};
