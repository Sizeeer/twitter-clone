import express from "express";
import TopicService from "../services/TopicService";
class TopicController {
  async getTopicsTweets(req: express.Request, res: express.Response) {
    try {
      const topicsTweets = await TopicService.getTopicsTweets(req);
      res.status(200).json({
        status: "success",
        data: topicsTweets,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

export default new TopicController();
