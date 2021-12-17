import { useState } from "react";
import { useInfiniteQuery } from "react-query";

import { TweetAttributes } from "../../../shared/types/tweetTypes";
import { TweetApi } from "../api/tweetApi";
import { PersonalTweetAttributes } from "../shared/types/tweetTypes";

type TweetsResult<T = any> = {
  readonly data: TweetAttributes[];
  readonly allCount: number;
};
type GetNextPageParam = <T = any>(
  lastpage: TweetsResult<T>,
  pages: TweetsResult<T>[]
) => number | undefined;

const getNextPageParam: GetNextPageParam = (lastPage, pages) => {
  if (lastPage) {
    //@ts-ignore
    const pagesCount = pages.reduce((acc, page) => {
      return acc + page.data.length;
    }, 0);
    console.log(pagesCount);

    return lastPage?.allCount > pagesCount ? pages.length + 1 : undefined;
  }

  return undefined;
};

export const useGetPersonalTweets = (days: number = 5) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isFetching,
    isSuccess,
    isFetched,
  } = useInfiniteQuery(
    ["personal_tweets"],
    async ({ pageParam = 1 }) => {
      const data = await TweetApi.getPersonalTweets(days, 10, pageParam);
      return data;
    },
    {
      retry: 1,
      //@ts-ignore
      getNextPageParam,
      refetchOnWindowFocus: false,
    }
  );

  return {
    personalTweets: data?.pages
      //@ts-ignore
      .map((page) => page.data)
      .flat() as PersonalTweetAttributes[],
    isLoading: isFetching,
    isError,
    isSuccess,
    error,
    isFetched,
    getMoreTweets: fetchNextPage,
    hasTweets: hasNextPage,
  };
};
