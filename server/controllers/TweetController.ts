//@ts-nocheck
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
      const page = Number(req.query.page) ? Number(req.query.page) : 0;

      const subscriptionsAllCount = await UserService.getAllSubscriptionsTweets(
        myDataId,
        days
      ).then((data) => data.length);

      const subscriptionsTweets = await UserService.getSubscriptionsTweets(
        myDataId,
        days,
        limit,
        page
      );
      super.sendSuccess(res, {
        data: [...subscriptionsTweets],
        allCount: subscriptionsAllCount,
      });
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
      const myDataId = req.query.id;
      const days = Number(req.query.days) ? Number(req.query.days) : 1;
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const page = Number(req.query.page) ? Number(req.query.page) : 0;
      const allPersonalTweetsCount = await UserService.getAllPersonalTweets(
        myDataId,
        days
      ).then((data) => data.length);
      const personalTweets = await UserService.getPersonalTweets(
        myDataId,
        days,
        limit,
        page
      );
      super.sendSuccess(res, {
        data: [...personalTweets],
        allData: allPersonalTweetsCount,
      });
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
      const myDataId = req.query.id;

      const days = Number(req.query.days) ? Number(req.query.days) : 1;
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const page = Number(req.query.page) ? Number(req.query.page) : 0;
      const allLikedTweetsCount = await UserService.getAllLikedTweets(
        myDataId,
        days
      ).then((data) => data.length);
      const likedTweets = await UserService.getLikedTweets(
        myDataId,
        days,
        limit,
        page
      );
      super.sendSuccess(res, {
        data: [...likedTweets],
        allCount: allLikedTweetsCount,
      });
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
      const page = Number(req.query.page) ? Number(req.query.page) : 0;

      const myDataId = super.userDataFromRequest(req)?.userId;

      // const personalTweets = await UserService.getPersonalTweets(myDataId);

      // const likedTweets = await UserService.getLikedTweets(myDataId);

      const subscriptionsAllCount = await UserService.getAllSubscriptionsTweets(
        myDataId,
        days
      ).then((data) => data.length);

      const subscriptionsTweets = await UserService.getSubscriptionsTweets(
        myDataId,
        days,
        limit,
        page
      );

      const tweets = {
        liked: {
          tweets: [],
          nextOffset: undefined,
        },
        personal: {
          tweets: [],
          nextOffset: undefined,
        },
        subscriptions: {
          tweets: [...subscriptionsTweets],
          allCount: subscriptionsAllCount,
        },
      };

      // const tweets = {
      //   liked: {
      //     tweets: [...likedTweets],
      //     nextOffset:
      //       likedTweets.length >= offset + limit ? offset + limit : undefined,
      //   },
      //   personal: {
      //     tweets: [...personalTweets],
      //     nextOffset:
      //       personalTweets.length >= offset + limit
      //         ? offset + limit
      //         : undefined,
      //   },
      //   subscriptions: {
      //     tweets: [...subscriptionsTweets],
      //     nextOffset:
      //       subscriptionsAllCount >= offset + limit
      //         ? offset + limit
      //         : undefined,
      //   },
      // };

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
      const tweetId = req.params.id;

      const tweet = await TweetService.getCurrentTweetForFront(tweetId);
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
