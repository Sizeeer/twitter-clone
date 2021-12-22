import { TopicsTweets } from "../../../shared/types/topicTypes";
import { axios } from "../utils/axios";
import { SuccessResponse } from "./../../../shared/types/communicationTypes";

interface ITopicAPI {
  getTopicsTweets: (
    title?: string,
    limit?: number,
    page?: number
  ) => Promise<TopicsTweets[] | undefined>;
}

export const TopicApi: ITopicAPI = {
  getTopicsTweets(title, limit, page) {
    return axios
      .get<SuccessResponse<TopicsTweets[]>>(
        `/topics/?title=${title}&limit=${limit}&page=${page}`
      )
      .then(({ data }) => data.data);
  },
};
