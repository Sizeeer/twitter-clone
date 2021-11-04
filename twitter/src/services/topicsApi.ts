import { axios } from "../utils/axios";
import { TopicsState } from "../store/ducks/topics/contracts/reducer";

export const TopicsApi = {
  fetchTopics(): Promise<TopicsState["items"]> {
    return axios.get("/topics").then(({ data }) => data);
  },
};
