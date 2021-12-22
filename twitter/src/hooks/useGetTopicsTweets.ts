import { useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";

import { TopicsTweets } from "../shared/types/topicTypes";
import { TweetAttributes } from "../shared/types/tweetTypes";
import { TopicApi } from "./../api/topicApi";

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

    return lastPage?.allCount > pagesCount ? pages.length + 1 : undefined;
  }

  return undefined;
};

export const useGetTopicsTweets = (title: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    refetch,
    isFetching,
    isSuccess,
    isFetched,
  } = useInfiniteQuery(
    ["topicsTweets"],
    async ({ pageParam = 1 }) => {
      const data = await TopicApi.getTopicsTweets(title, 10, pageParam);
      return data as TopicsTweets[];
    },
    {
      retry: 1,
      //@ts-ignore
      getNextPageParam,
      refetchOnWindowFocus: false,
    }
  );

  const tweets = useMemo(() => {
    return data?.pages //@ts-ignore
      .map((page) => page.data)
      .flat();
  }, [data]);

  return {
    topicsTweets: tweets as TweetAttributes[],
    isLoading: isFetching,
    isError,
    isSuccess,
    error,
    refetch,
    isFetched,
    getMore: fetchNextPage,
    hasTopicsTweets: hasNextPage,
  };
};
