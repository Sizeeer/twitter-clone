import express from "express";

import TweetService from "../services/TweetService";
import UserService from "../services/UserService";

class TweetController {
  //Готово
  async like(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.like(req);
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
  async unlike(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.unlike(req);
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
  async retweet(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.retweet(req);
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
  async getLikedTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const likedTweets = await UserService.getLikedTweets(req);
      res.status(200).json({
        status: "success",
        data: likedTweets,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async getSubscriptionsTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const subscriptionsTweets = await UserService.getSubscriptionsTweets(req);
      res.status(200).json({
        status: "success",
        data: subscriptionsTweets,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async getPersonalTweets(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const personalTweets = await UserService.getPersonalTweets(req);
      res.status(200).json({
        status: "success",
        data: personalTweets,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // async getFollowsTweets(
  //   req: express.Request,
  //   res: express.Response
  // ): Promise<void> {
  //   try {
  //     const followsTweets = await TweetService.getFollowsTweets(req);
  //     res.status(200).json({
  //       status: "success",
  //       data: followsTweets,
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       status: "error",
  //       message: err.message,
  //     });
  //   }
  // }
  //Готово
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const createdTweet = await TweetService.create(req);
      res.status(200).json({
        status: "success",
        data: createdTweet,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  //Готово
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      await TweetService.delete(req);
      res.status(200).json({
        status: "success",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  // async update(req: express.Request, res: express.Response) {
  //   try {
  //     const updatedTweet = await TweetService.update(req);
  //     res.status(200).json({
  //       status: "success",
  //       data: updatedTweet,
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       status: "error",
  //       message: err.message,
  //     });
  //   }
  // }
}

export default new TweetController();
