import { MessageAttributes } from "../shared/types/chatTypes";
import { axios } from "../utils/axios";
import { SuccessResponse } from "./../../../shared/types/communicationTypes";
import { UserAttributes } from "./../shared/types/userTypes";

interface IChatAPI {
  getChats: () => Promise<
    { user: UserAttributes; lastMessageDate: Date }[] | undefined
  >;
  getMessages: (
    limit?: number,
    page?: number,
    userId?: string
  ) => Promise<MessageAttributes[] | undefined>;
}

export const ChatApi: IChatAPI = {
  getChats() {
    return axios
      .get<SuccessResponse<{ user: UserAttributes; lastMessageDate: Date }[]>>(
        `/chats`
      )
      .then(({ data }) => data.data);
  },
  getMessages(limit, page, userId) {
    return axios
      .get<SuccessResponse<MessageAttributes[]>>(
        `/chats/messages/?limit=${limit}&page=${page}&companionId=${userId}`
      )
      .then(({ data }) => data.data);
  },
};
