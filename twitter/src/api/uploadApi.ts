import { SuccessResponse } from "../../../shared/types/communicationTypes";
import { axios } from "../utils/axios";

interface IUploadAPI {
  upload: (formData: FormData) => Promise<string[] | undefined>;
}

export const UploadApi: IUploadAPI = {
  upload(formData) {
    return axios
      .post<SuccessResponse<string[]>>("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => data.data);
  },
};
