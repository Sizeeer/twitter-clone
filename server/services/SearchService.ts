import express from "express";

import { SearchData } from "../types/searchTypes";
import TopicService from "./TopicService";
import UserService from "./UserService";

class SearchService {
  async getSearchData(req: express.Request): Promise<SearchData> {
    const users = await UserService.getUsersByName(req);
    const topics = await TopicService.getTopicsByTitle(req);

    return {
      users,
      topics,
    };
  }
}

export default new SearchService();
