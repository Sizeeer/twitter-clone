import { Router } from "express";
import UserController from "../controllers/UserController";
import { passport } from "../core/passport";

const authRouter = Router();

authRouter.post("/register", UserController.register);
authRouter.post(
  "/login",
  passport.authenticate("local"),
  UserController.afterLogin
);

export { authRouter };
