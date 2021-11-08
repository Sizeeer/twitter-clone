import { Router } from "express";

import UserController from "../controllers/UserController";
import { passport } from "../core/passport";

const userRouter = Router();

//Подписка на человека
userRouter.post(
  "/subscribe/:id",
  passport.authenticate("jwt"),
  UserController.subscribe
);

//Отписка от человека
userRouter.post(
  "/unsubscribe/:id",
  passport.authenticate("jwt"),
  UserController.unsubscribe
);

//Обновление профиля
userRouter.put("/update", passport.authenticate("jwt"), UserController.update);

//Получение подписчиков
userRouter.get(
  "/followers",
  passport.authenticate("jwt"),
  UserController.getSubscribers
);

//Получение подписок
userRouter.get(
  "/follows",
  passport.authenticate("jwt"),
  UserController.getSubscriptions
);

//Получение информации о пользователе
userRouter.get("/:id", UserController.getUserData);

export { userRouter };
