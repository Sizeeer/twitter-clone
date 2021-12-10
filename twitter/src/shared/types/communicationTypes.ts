export enum Status {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
}

export interface SuccessResponse<T = void> {
  status: Status.SUCCESS;
  data?: T;
}

export interface ErrorResponse {
  status: Status.ERROR;
  message: string;
}
