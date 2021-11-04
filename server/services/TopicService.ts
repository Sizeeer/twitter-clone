import { TweetAttributes } from "./../types/tweetTypes";
import express from "express";
import { Op, Sequelize } from "sequelize";
import { db } from "../db/db";
import { TopicAttributes } from "../types/topicTypes";

const Topics = db.Topics;
const Tweets = db.Tweets;

interface RequestTopicBody {
  title: string;
}
class TopicService {
  private _defaultLimit = 3;

  async getTopicsTweets(
    req: express.Request
  ): Promise<TopicAttributes & { tweets: TweetAttributes[] }> {
    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : this._defaultLimit;

    const topicsTweets = await Topics.findAll({
      limit,
      order: [["count", "DESC"]],
      include: {
        model: Tweets,
        as: "tweets",
      },
    });
    //@ts-ignore
    return topicsTweets;
  }

  async getTopicsByTitle(req: express.Request): Promise<TopicAttributes[]> {
    const title = (req.query.name as string).toLowerCase();

    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : this._defaultLimit;

    const topics = await Topics.findAll({
      limit,
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("title")),
        "LIKE",
        `${title}%`
      ),
    });

    return topics;
  }
}

export default new TopicService();
