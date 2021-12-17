// import { useInfiniteQuery } from "react-query";
// import { TweetApi } from "../../../api/tweetApi";

// type TweetsResult<T = any> = {
//   readonly subscriptions: {
//     tweets: any[];
//     allCount: number;
//   };
//   readonly personal: {
//     tweets: any[];
//     allCount: number;
//   };
//   readonly liked: {
//     tweets: any[];
//     allCount: number;
//   };
// };
// type GetNextPageParam = <T = any>(
//   lastpage: TweetsResult<T>,
//   pages: TweetsResult<T>[]
// ) => number | undefined;

// const getNextPageParam: GetNextPageParam = (lastPage, pages) => {
//   if (lastPage) {
//     //@ts-ignore
//     const pagesCount = pages.reduce((acc, page) => {
//       return acc + page.subscriptions.tweets.length;
//     }, 0);
//     console.log(pagesCount);

//     return lastPage?.subscriptions.allCount > pagesCount
//       ? pages.length + 1
//       : undefined;
//   }

//   return undefined;
// };

// export const useGetTweets = (days: number = 5) => {
//   const {
//     data,
//     isLoading,
//     fetchNextPage,
//     hasNextPage,
//     isError,
//     error,
//     isSuccess,
//   } = useInfiniteQuery(
//     ["tweets"],
//     async ({ pageParam = 1 }) => {
//       const data = await TweetApi.getTweets(days, 10, pageParam);
//       return data;
//     },
//     {
//       retry: 1,
//       //@ts-ignore
//       getNextPageParam,
//       refetchOnMount: false,
//       refetchOnWindowFocus: false,
//     }
//   );

//   return {
//     data,
//     isLoading,
//     isError,
//     error,
//     getMoreTweets: fetchNextPage,
//     hasTweets: hasNextPage,
//     isSuccess,
//   };
// };
