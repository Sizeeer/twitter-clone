import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { TweetApi } from "../api/tweetApi";
import { setNotification } from "../store/notification/notificationSlice";

export const useLikeTweet = () => {
  const dispatch = useDispatch();

  const {
    mutate: like,
    isLoading: isLikeLoading,
    isError: isLikeError,
    error: likeError,
  } = useMutation(
    //@ts-ignore
    (tweetId: string) => {
      return TweetApi.like(tweetId);
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
    mutate: unlike,
    isLoading: isUnlikeLoading,
    isError: isUnlikeError,
    error: unlikeError,
  } = useMutation(
    //@ts-ignore
    (tweetId: string) => {
      return TweetApi.unlike(tweetId);
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
    like,
    isLikeLoading,
    isLikeError,
    likeError,
    unlike,
    isUnlikeLoading,
    isUnlikeError,
    unlikeError,
  };
};
