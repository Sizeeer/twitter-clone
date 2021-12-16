import express from "express";

import RecommendationService from "../services/RecommendationService";
import { Controller } from "./Controller";

class RecommendationController extends Controller {
  async getPeople(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);

      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const people = await RecommendationService.getPeople(myData, limit);
      super.sendSuccess(res, people);
    } catch (err) {
      super.sendError(res, err);
    }
  }

  async getTopics(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;

      const topics = await RecommendationService.getTopics(myData, limit);
      console.log(topics);

      super.sendSuccess(res, topics);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new RecommendationController();
