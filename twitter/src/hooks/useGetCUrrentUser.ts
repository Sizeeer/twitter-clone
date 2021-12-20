import { UserApi } from "../api/userApi";
import { useQuery } from "react-query";

export const useGetCurrentUser = (userId: string) => {
  const { data, isLoading, isError, error } = useQuery(
    ["profile", userId],
    async () => {
      const data = await UserApi.getUserData(userId);
      return data;
    },
    {
      retry: 1,
    }
  );

  return {
    currentUserData: data,
    isLoading,
    isError,
    error,
  };
};
