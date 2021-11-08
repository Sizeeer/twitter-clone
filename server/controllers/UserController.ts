import express from "express";

import UserService from "../services/UserService";
import { Controller } from "./Controller";

class UserController extends Controller {
  //Готово
  async register(req: express.Request, res: express.Response): Promise<void> {
    try {
      const registeredUser = await UserService.register(req.body);
      super.sendSuccess(res, registeredUser);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async subscribe(req: express.Request, res: express.Response): Promise<void> {
    try {
      await UserService.subscribe(req);
      super.sendSuccess(res);
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
      await UserService.unsubscribe(req);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово. В будущем смену пароля сделать
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const updatedUser = await UserService.update(req, req.body);
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
      const subscribers = await UserService.getSubscribers(req);
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
      const subscriptions = await UserService.getSubscriptions(req);
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
      const user = await UserService.getUserData(req);
      super.sendSuccess(res, user);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data = await UserService.afterLogin(req);
      super.sendSuccess(res, data);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new UserController();
