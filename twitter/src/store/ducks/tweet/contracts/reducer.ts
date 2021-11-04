import { UserInterface } from "../../user/contracts/reducer";
export enum LOADING_STATE {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface TagInterface {
  _id: string;
  tagName: string;
  count: number;
}

export interface Tweet {
  _id: string;
  text: string;
  images: string[];
  user: {
    fullname: string;
    username: string;
    avatar: string;
  };
  tags: TagInterface[];
  parentKey?: string;
  whoRetweeted?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TweetState {
  data?: Tweet;
  loadingState: LOADING_STATE;
}
