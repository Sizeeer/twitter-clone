import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { TweetApi } from "../../../api/tweetApi";
import { setNotification } from "../../../store/notification/notificationSlice";

export const useRetweet = () => {
  const dispatch = useDispatch();

  const {
    mutate: retweet,
    isLoading: isRetweetLoading,
    isError: isRetweetError,
    error: retweetError,
  } = useMutation(
    //@ts-ignore
    (tweetId: string) => {
      return TweetApi.retweet(tweetId);
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
    mutate: unretweet,
    isLoading: isUnretweetLoading,
    isError: isUnretweetError,
    error: unretweetError,
  } = useMutation(
    //@ts-ignore
    (tweetId: string) => {
      return TweetApi.unretweet(tweetId);
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

  return {
    retweet,
    isRetweetLoading,
    isRetweetError,
    retweetError,
    unretweet,
    isUnretweetLoading,
    isUnretweetError,
    unretweetError,
  };
};
