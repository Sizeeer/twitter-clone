import express from "express";

import TweetService from "../services/TweetService";
import UserService from "../services/UserService";
import { Controller } from "./Controller";

class TweetController extends Controller {
  //Готово
  async like(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      const myData = super.userDataFromRequest(req);
      await TweetService.like(myData, tweetId);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async unlike(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      const myData = super.userDataFromRequest(req);
      await TweetService.unlike(myData, tweetId);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async retweet(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      const myData = super.userDataFromRequest(req);
      await TweetService.retweet(myData, tweetId);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  async unretweet(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      const myData = super.userDataFromRequest(req);
      await TweetService.unretweet(myData, tweetId);
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
      const myData = super.userDataFromRequest(req);
      const likedTweets = await UserService.getLikedTweets(myData.userId);
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
      const myDataId = super.userDataFromRequest(req)?.userId;

      const days = Number(req.query.days) ? Number(req.query.days) : 1;
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const offset = Number(req.query.offset) ? Number(req.query.offset) : 0;

      const subscriptionsTweets = await UserService.getSubscriptionsTweets(
        myDataId,
        days,
        limit,
        offset
      );
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
      const myDataId = super.userDataFromRequest(req)?.userId;
      const personalTweets = await UserService.getPersonalTweets(myDataId);
      super.sendSuccess(res, personalTweets);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  async getTweets(req: express.Request, res: express.Response): Promise<void> {
    try {
      const days = Number(req.query.days) ? Number(req.query.days) : 1;
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const offset = Number(req.query.offset) ? Number(req.query.offset) : 0;

      const myDataId = super.userDataFromRequest(req)?.userId;

      const personalTweets = await UserService.getPersonalTweets(myDataId);

      const likedTweets = await UserService.getLikedTweets(myDataId);

      const subscriptionsAllCount = await UserService.getSubscriptionsTweets(
        myDataId,
        days,
        null,
        null
      ).then((data) => data.length);

      const subscriptionsTweets = await UserService.getSubscriptionsTweets(
        myDataId,
        days,
        limit,
        offset
      );

      const tweets = {
        liked: {
          tweets: [...likedTweets],
          nextOffset:
            likedTweets.length >= offset + limit ? offset + limit : undefined,
        },
        personal: {
          tweets: [...personalTweets],
          nextOffset:
            personalTweets.length >= offset + limit
              ? offset + limit
              : undefined,
        },
        subscriptions: {
          tweets: [...subscriptionsTweets],
          nextOffset:
            subscriptionsAllCount >= offset + limit
              ? offset + limit
              : undefined,
        },
      };

      super.sendSuccess(res, tweets);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  async getCurrentTweet(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const tweetId = req.params.tweetId;
      const tweet = await TweetService.getCurrentTweet(tweetId);
      super.sendSuccess(res, tweet);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const createdTweet = await TweetService.create(myData, req.body);
      super.sendSuccess(res, createdTweet);
    } catch (err) {
      super.sendError(res, err);
    }
  }
  //Готово
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      const myData = super.userDataFromRequest(req);
      await TweetService.delete(myData, tweetId);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new TweetController();
