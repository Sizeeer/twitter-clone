import express from "express";

import TopicService from "../services/TopicService";
import { Controller } from "./Controller";

class TopicController extends Controller {
  async getTopicsTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;

      const topicsTweets = await TopicService.getTopicsTweets(limit);
      super.sendSuccess(res, topicsTweets);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new TopicController();
