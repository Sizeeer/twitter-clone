export enum Statuses {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
}

export interface SuccessResponse<T = void> {
  status: Statuses.SUCCESS;
  data?: T;
}

export interface ErrorResponse {
  status: Statuses.ERROR;
  message: string;
}
