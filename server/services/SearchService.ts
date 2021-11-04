import { TopicAttributes } from "./../types/topicTypes";
import { UserAttributes } from "./../types/userTypes";
import express from "express";
import UserService from "./UserService";
import TopicService from "./TopicService";

interface SearchData {
  users: UserAttributes[];
  topics: TopicAttributes[];
}

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
