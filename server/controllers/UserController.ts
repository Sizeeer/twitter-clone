import express from "express";

import UserService from "../services/UserService";

class UserController {
  //Готово
  async register(req: express.Request, res: express.Response): Promise<void> {
    try {
      const registeredUser = await UserService.register(req.body);
      res.status(200).json({
        status: "success",
        data: registeredUser,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async subscribe(req: express.Request, res: express.Response): Promise<void> {
    try {
      await UserService.subscribe(req);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async unsubscribe(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await UserService.unsubscribe(req);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово. В будущем смену пароля сделать
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const updatedUser = await UserService.update(req, req.body);
      res.status(200).json({
        status: "success",
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async getSubscribers(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const subscribers = await UserService.getSubscribers(req);
      res.status(200).json({
        status: "success",
        data: subscribers,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async getSubscriptions(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const subscriptions = await UserService.getSubscriptions(req);
      res.status(200).json({
        status: "success",
        data: subscriptions,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async getUserData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const user = await UserService.getUserData(req);

      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Пользователь не найден",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data = await UserService.afterLogin(req);

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

export default new UserController();
