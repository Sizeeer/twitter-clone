import { UserInterface } from "./../../user/contracts/reducer";
export enum LOADING_STATE {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface RecommendationData {
  fullname: string;
  username: string;
  avatar: string;
}

export interface RecommendationState {
  data: RecommendationData[] | undefined;
  loadingState: LOADING_STATE;
}
