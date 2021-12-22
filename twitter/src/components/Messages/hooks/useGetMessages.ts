import { useState } from "react";
import { useInfiniteQuery } from "react-query";

import { ChatApi } from "../../../api/chatApi";
import { MessageAttributes } from "../../../shared/types/chatTypes";

type MessagesResult<T = any> = {
  readonly data: MessageAttributes[];
  readonly allCount: number;
};
type GetNextPageParam = <T = any>(
  lastpage: MessagesResult<T>,
  pages: MessagesResult<T>[]
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

export const useGetMessages = (userId: string) => {
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
    ["messages", userId],
    async ({ pageParam = 1 }) => {
      const data = await ChatApi.getMessages(10, pageParam, userId);
      return data as MessageAttributes[];
    },
    {
      retry: 1,
      //@ts-ignore
      getNextPageParam,
      refetchOnWindowFocus: false,
    }
  );

  return {
    messages:
      (data?.pages
        //@ts-ignore
        .map((page) => page.data)
        .flat() as MessageAttributes[]) || [],
    isLoading: isFetching,
    isError,
    isSuccess,
    error,
    isFetched,
    getMoreMessages: fetchNextPage,
    hasMessages: hasNextPage,
  };
};
