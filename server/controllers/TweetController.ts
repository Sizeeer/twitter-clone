import express from "express";

import TweetService from "../services/TweetService";
import UserService from "../services/UserService";
import { Controller } from "./Controller";

class TweetController extends Controller {
  //Готово
  async like(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.like(req);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async unlike(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.unlike(req);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async retweet(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.retweet(req);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async getLikedTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const likedTweets = await UserService.getLikedTweets(req);
      super.sendSuccess(res, likedTweets);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async getSubscriptionsTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const subscriptionsTweets = await UserService.getSubscriptionsTweets(req);
      super.sendSuccess(res, subscriptionsTweets);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async getPersonalTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const personalTweets = await UserService.getPersonalTweets(req);
      super.sendSuccess(res, personalTweets);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const createdTweet = await TweetService.create(req);
      super.sendSuccess(res, createdTweet);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.delete(req);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new TweetController();
