import express from "express";
import { TweetInterface } from "../shared/types/tweetTypes";
import { UserInterface } from "../shared/types/userTypes";

export interface CustomCreateTweetRequest extends express.Request {
  body: {
    payload: { text: string; urls: string[]; tags: string[] };
  };
  user?: UserInterface;
}

export interface RequestWithTweet extends express.Request {
  tweet: TweetInterface;
}
