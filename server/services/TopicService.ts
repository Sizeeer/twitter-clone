import express from "express";
import { Sequelize } from "sequelize";

import { db } from "../db/db";
import { QueryError } from "../errors/QueryError";
import { TopicAttributes, TopicsTweets } from "../../shared/types/topicTypes";
import { Service } from "./Service";

const Topics = db.Topics;
const Tweets = db.Tweets;

class TopicService extends Service {
  async getTopicsTweets(limit: number): Promise<TopicsTweets[]> {
    const topicsTweets = (await Topics.findAll({
      limit,
      order: [["count", "DESC"]],
      include: {
        model: Tweets,
        as: "tweets",
      },
    })) as unknown;

    return topicsTweets as TopicsTweets[];
  }

  async getTopicsByTitle(
    queryTitle: string,
    limit: number
  ): Promise<TopicAttributes[]> {
    if (queryTitle === undefined) {
      throw new QueryError("title", 422);
    }

    const title = queryTitle.toLowerCase();

    const topics = await Topics.findAll({
      limit,
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("title")),
        "LIKE",
        `#${title}%`
      ),
    });

    return topics;
  }
}

export default new TopicService();
