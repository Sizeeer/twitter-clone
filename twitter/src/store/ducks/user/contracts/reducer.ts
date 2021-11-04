import { TweetInterface } from "./../../../../../server/types/tweetTypes";
export enum USER_LOADING_STATE {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
  SUCCESS = "SUCCESS",
}

export interface UserInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  location?: string;
  avatar?: string;
  password: string;
  confirmed: boolean;
  confirmHash: string;
  createdAt: string;
  about?: string;
  tweets: TweetInterface[];
  likedTweets: string[];
  retweetedTweets: string[];
  readable: UserInterface[];
  readers: UserInterface[];
}

export interface AuthorizedUserInterface extends UserInterface {
  token: string;
}

export interface UserState {
  data: UserInterface | undefined;
  loadingState: USER_LOADING_STATE;
}
