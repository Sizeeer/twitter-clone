import { Router } from "express";

import TopicController from "../controllers/TopicController";

const topicRouter = Router();

//Получение самых популярных тем и твитов по ним по миру. Готово
topicRouter.get("/", TopicController.getTopicsTweets);

export { topicRouter };
