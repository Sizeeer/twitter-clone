import { axios } from "../utils/axios";
import { SuccessResponse } from "./../../../shared/types/communicationTypes";
import { SearchData } from "./../../../shared/types/searchTypes";

interface ISearchAPI {
  getSearchData: (
    name: string,
    limit?: number
  ) => Promise<SearchData | undefined>;
}

export const SearchApi: ISearchAPI = {
  getSearchData(name, limit) {
    return axios
      .get<SuccessResponse<SearchData>>(`/search/?name=${name}&limit=${limit}`)
      .then(({ data }) => data.data);
  },
};
