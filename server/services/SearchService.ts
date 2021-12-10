import express from "express";

import { SearchData } from "../../shared/types/searchTypes";
import TopicService from "./TopicService";
import UserService from "./UserService";

class SearchService {
  async getSearchData(queryName: string, limit: number): Promise<SearchData> {
    const users = await UserService.getUsersByName(queryName, limit);
    const topics = await TopicService.getTopicsByTitle(queryName, limit);

    return {
      users,
      topics,
    };
  }
}

export default new SearchService();
