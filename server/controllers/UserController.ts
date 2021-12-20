import express from "express";
import { RegisterDataInterface } from "../../shared/types/userTypes";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";
import { Controller } from "./Controller";

class UserController extends Controller {
  //Готово
  async register(req: express.Request, res: express.Response): Promise<void> {
    try {
      const registerData = req.body as RegisterDataInterface;
      const registeredUser = await UserService.register(registerData);
      super.sendSuccess(res, registeredUser);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async subscribe(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const subscriptionId = req.params.id;
      const subscriptionLogin = await UserService.subscribe(
        myData,
        subscriptionId
      );
      super.sendSuccess(res, subscriptionLogin);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async unsubscribe(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const subscriptionId = req.params.id;
      const subscriptionLogin = await UserService.unsubscribe(
        myData,
        subscriptionId
      );
      super.sendSuccess(res, subscriptionLogin);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово. В будущем смену пароля сделать
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);

      const updatedUser = await UserService.update(myData.userId, req.body);
      super.sendSuccess(res, updatedUser);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async getSubscribers(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const subscribers = await UserService.getSubscribers(myData);
      super.sendSuccess(res, subscribers);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async getSubscriptions(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const subscriptions = await UserService.getSubscriptions(myData.userId);
      super.sendSuccess(res, subscriptions);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async getUserData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const userId = req.params.id;

      const user = await UserService.getUserData(userId);
      super.sendSuccess(res, user);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async me(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);

      const user = await UserService.me(myData.userId);
      super.sendSuccess(res, user);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = super.userDataFromRequest(req)
        ? super.userDataFromRequest(req)
        : undefined;

      const authorizedUser = {
        ...user,
        token: jwt.sign({ data: user }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        }),
      };

      super.sendSuccess(res, authorizedUser);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new UserController();
