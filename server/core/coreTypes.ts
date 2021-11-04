import express from "express";
import { TweetInterface } from "../types/tweetTypes";
import { UserInterface } from "../types/userTypes";

export interface CustomCreateTweetRequest extends express.Request {
  body: {
    payload: { text: string; urls: string[]; tags: string[] };
  };
  user?: UserInterface;
}

export interface RequestWithTweet extends express.Request {
  tweet: TweetInterface;
}
