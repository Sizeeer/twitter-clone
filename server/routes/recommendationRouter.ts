import { Router } from "express";
import RecommendationController from "../controllers/RecommendationController";
import { passport } from "../core/passport";

const recommendationRouter = Router();

//Получение рекомендованных для подписки людей
recommendationRouter.get(
  "/people",
  passport.authenticate("jwt"),
  RecommendationController.getPeople
);

//Получение рекомендованных тем
recommendationRouter.get(
  "/topics",
  passport.authenticate("jwt"),
  RecommendationController.getTopics
);

export { recommendationRouter };
