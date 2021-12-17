import { useState } from "react";
import { useInfiniteQuery } from "react-query";

import { TweetApi } from "../../../api/tweetApi";
import { TweetAttributes } from "../../../shared/types/tweetTypes";

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

export const useGetSubscriptionsTweets = (days: number = 5) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isFetching,
    isSuccess,

    isFetched,
  } = useInfiniteQuery(
    ["sub_tweets"],
    async ({ pageParam = 1 }) => {
      const data = await TweetApi.getSubscriptionsTweets(days, 10, pageParam);
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
    //@ts-ignore
    subscriptionsTweets: data?.pages.map((page) => page.data).flat(),
    isLoading: isFetching,
    isError,
    isSuccess,
    error,
    isFetched,
    getMoreTweets: fetchNextPage,
    hasTweets: hasNextPage,
  };
};
