import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

import { queryClient } from "../../..";
import { TweetApi } from "../../../api/tweetApi";

import {
  CreateTweetBody,
  TweetAttributes,
} from "../../../shared/types/tweetTypes";
import { setNotification } from "../../../store/notification/notificationSlice";

export const useCreateTweet = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading, isError, error } = useMutation(
    //@ts-ignore
    (body: CreateTweetBody) => {
      return TweetApi.create(body);
    },
    {
      onSuccess: (data: TweetAttributes) => {
        queryClient.invalidateQueries("tweets");
        dispatch(
          setNotification({
            message: "Твит успешно создан",
            type: "success",
          })
        );
      },
      onError: () => {
        dispatch(
          setNotification({
            message: "Произошла ошибка при создании. Повторите попытку",
            type: "error",
          })
        );
      },
    }
  );

  return { createTweet: mutate, isLoading, isError, error };
};
