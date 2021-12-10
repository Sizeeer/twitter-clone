import { TopicAttributes } from "../../../shared/types/topicTypes";
import { axios } from "../utils/axios";
import { SuccessResponse } from "./../../../shared/types/communicationTypes";
import { UserAttributes } from "./../../../shared/types/userTypes";

interface IRecommendationAPI {
  getPeople: (limit?: number) => Promise<UserAttributes[] | undefined>;
  getTopics: (limit?: number) => Promise<TopicAttributes[] | undefined>;
}

export const RecommendationApi: IRecommendationAPI = {
  getPeople(limit) {
    return axios
      .get<SuccessResponse<UserAttributes[]>>(
        `/recommendations/people/?limit=${limit}`
      )
      .then(({ data }) => data.data);
  },
  getTopics(limit) {
    return axios
      .get<SuccessResponse<TopicAttributes[]>>(
        `/recommendations/topics/?limit=${limit}`
      )
      .then(({ data }) => data.data);
  },
};
