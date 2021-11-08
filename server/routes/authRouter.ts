import { Router } from "express";

import UserController from "../controllers/UserController";
import { passport } from "../core/passport";

const authRouter = Router();

//Регистрация. Готово
authRouter.post("/register", UserController.register);

//Авторизация. Готово
authRouter.post(
  "/login",
  passport.authenticate("local"),
  UserController.afterLogin
);

export { authRouter };
