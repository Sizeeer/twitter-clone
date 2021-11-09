import express from "express";
import { Sequelize } from "sequelize";

import { db } from "../db/db";
import { QueryError } from "../errors/QueryError";
import { TopicAttributes, TopicsTweets } from "../types/topicTypes";
import { Service } from "./Service";

const Topics = db.Topics;
const Tweets = db.Tweets;

class TopicService extends Service {
  async getTopicsTweets(req: express.Request): Promise<TopicsTweets[]> {
    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : super.defaultLimit;

    const topicsTweets = await Topics.findAll({
      limit,
      order: [["count", "DESC"]],
      include: {
        model: Tweets,
        as: "tweets",
      },
    });

    //Fixme подумать как затипизировать
    //@ts-ignore
    return topicsTweets;
  }

  async getTopicsByTitle(req: express.Request): Promise<TopicAttributes[]> {
    const queryTitle = req.query.name as string;

    if (queryTitle === undefined) {
      throw new QueryError("title", 422);
    }

    const title = queryTitle.toLowerCase();

    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : super.defaultLimit;

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
