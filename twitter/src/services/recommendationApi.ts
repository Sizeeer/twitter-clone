import { RecommendationData } from "../store/ducks/recommendation/contracts/reducer";
import { axios } from "../utils/axios";

interface Response<T> {
  status: string;
  data: T;
}

export const RecommendationApi = {
  getRecommendationData(): Promise<RecommendationData[]> {
    return axios
      .get<Response<RecommendationData[]>>("/users/recommendation")
      .then(({ data }) => data.data);
  },
};
