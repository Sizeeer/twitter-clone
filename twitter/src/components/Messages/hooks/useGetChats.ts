import { UserAttributes } from "./../../../shared/types/userTypes";
import { useQuery } from "react-query";
import { ChatApi } from "../../../api/chatApi";

export const useGetChats = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["chats"],
    async () => {
      const data = await ChatApi.getChats();
      return data as { user: UserAttributes; lastMessageDate: Date }[];
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  return {
    chatData: data || [],
    isLoading,
    isError,
    error,
  };
};
