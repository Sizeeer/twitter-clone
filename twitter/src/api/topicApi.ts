import { TopicsTweets } from "../../../shared/types/topicTypes";
import { axios } from "../utils/axios";
import { SuccessResponse } from "./../../../shared/types/communicationTypes";

interface ITopicAPI {
  getTopicsTweets: (limit?: number) => Promise<TopicsTweets[] | undefined>;
}

export const TopicApi: ITopicAPI = {
  getTopicsTweets(limit) {
    return axios
      .get<SuccessResponse<TopicsTweets[]>>(`/topics/?limit=${limit}`)
      .then(({ data }) => data.data);
  },
};
