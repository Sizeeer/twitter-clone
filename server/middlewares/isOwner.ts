import express from "express";
import { db } from "../db/db";

export const isOwner = async (
  req: any,
  res: express.Response,
  next: () => void
) => {
  const userId = req.user._id;
  const tweetId = req.params.id;

  if (!userId) {
    res.status(500).send();
    return;
  }

  const tweet = await TweetModel.findById(tweetId);

  if (tweet) {
    if (String(tweet.user._id) === String(userId)) {
      req.tweet = tweet;
      next();
    } else {
      res.status(500).send();
    }
  } else {
    res.status(404).send();
  }
};
