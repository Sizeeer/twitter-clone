export enum LOADING_STATE {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER'
}

export interface Topic {
  _id: string;
  title: string;
  count: number;
}

export interface TopicsState {
  items: Topic[]
  loadingState: LOADING_STATE
}