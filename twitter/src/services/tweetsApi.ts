import { Tweet } from "../store/ducks/tweet/contracts/reducer";
import { axios } from "../utils/axios";

interface Response<T> {
  status: string;
  data: T;
}

export const TweetsApi = {
  fetchTweets(): Promise<Tweet[]> {
    return axios
      .get<Response<Tweet[]>>("/tweets")
      .then(({ data }) => data.data);
  },
  fetchTweetData(id: string): Promise<Tweet> {
    return axios
      .get<Response<Tweet>>("/tweets/" + id)
      .then(({ data }) => data.data);
  },
  addTweet(payload: {
    text: string;
    urls: string[];
    tags: string[];
  }): Promise<Tweet> {
    return axios
      .post<Response<Tweet>>("/tweets", { payload })
      .then(({ data }) => data.data);
  },
  deleteTweet(id: string): Promise<void> {
    return axios.delete(`/tweets/${id}`);
  },
};
