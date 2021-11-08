import express from "express";

import RecommendationService from "../services/RecommendationService";
import { Controller } from "./Controller";

class RecommendationController extends Controller {
  async getPeople(req: express.Request, res: express.Response): Promise<void> {
    try {
      const people = await RecommendationService.getPeople(req);
      super.sendSuccess(res, people);
    } catch (err) {
      super.sendError(res, err);
    }
  }

  async getTopics(req: express.Request, res: express.Response): Promise<void> {
    try {
      const topics = await RecommendationService.getTopics(req);
      super.sendSuccess(res, topics);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new RecommendationController();
