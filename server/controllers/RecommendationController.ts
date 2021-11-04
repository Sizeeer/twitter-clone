import express from "express";
import RecommendationService from "../services/RecommendationService";
class RecommendationController {
  async getPeople(req: express.Request, res: express.Response) {
    try {
      const people = await RecommendationService.getPeople(req);
      res.status(200).json({
        status: "success",
        data: people,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async getTopics(req: express.Request, res: express.Response) {
    try {
      const topics = await RecommendationService.getTopics(req);
      res.status(200).json({
        status: "success",
        data: topics,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

export default new RecommendationController();
