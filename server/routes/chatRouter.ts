import { Router } from "express";
import ChatController from "../controllers/ChatController";
// import ChatController from "../controllers/ChatController";

import { passport } from "../core/passport";

const chatRouter = Router();

//Создание чата
chatRouter.post(
  "/create/:companionId",
  passport.authenticate("jwt"),
  ChatController.create
);

//Получение чатов
chatRouter.get("/", passport.authenticate("jwt"), ChatController.getChats);

//Получение сообщений
chatRouter.get(
  "/messages",
  passport.authenticate("jwt"),
  ChatController.getMessages
);

export { chatRouter };
