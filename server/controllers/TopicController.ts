import express from "express";

import TopicService from "../services/TopicService";
import { Controller } from "./Controller";

class TopicController extends Controller {
  async getTopicsTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const title = req.query.title as string;
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const page = Number(req.query.page) ? Number(req.query.page) : 0;
      if (!title) {
        return super.sendSuccess(res, {
          data: [],
          allCount: 0,
        });
      }
      const allTopicsTweetsCount = await TopicService.getAllTopicsTweets(
        title,
        limit
      );
      const topicsTweets = await TopicService.getTopicsTweets(
        title,
        limit,
        page
      );
      super.sendSuccess(res, {
        data: [...topicsTweets],
        allCount: allTopicsTweetsCount,
      });
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new TopicController();
