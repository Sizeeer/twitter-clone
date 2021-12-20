import express from "express";
import { Sequelize } from "sequelize";

import { db } from "../db/db";
import { QueryError } from "../errors/QueryError";
import { TopicAttributes, TopicsTweets } from "../../shared/types/topicTypes";
import { Service } from "./Service";
import { TweetAttributes } from "../../shared/types/tweetTypes";
import { UserAttributes } from "../../shared/types/userTypes";

const Topics = db.Topics;
const Tweets = db.Tweets;
const Users = db.Users;

class TopicService extends Service {
  async getAllTopicsTweets(title: string, limit: number): Promise<number> {
    const topicsTweets = await Topics.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("title")),
        "LIKE",
        `#${title}%`
      ),
      include: [
        {
          model: Tweets,
          as: "tweets",
        },
      ],
    });

    return topicsTweets.length;
  }

  async getTopicsTweets(
    title: string,
    limit: number,
    page: number
  ): Promise<TopicsTweets[]> {
    const topicsTweets = await Topics.findAll({
      limit,
      order: [["count", "DESC"]],
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("title")),
        "LIKE",
        `#${title}%`
      ),
      include: [
        {
          model: Tweets,
          as: "tweets",
          include: [
            { model: Users, as: "user" },
            { model: Users, as: "retweetedUser" },
          ],
        },
      ],
      offset: (page - 1) * limit,
    })
      .then(
        (res) =>
          JSON.parse(JSON.stringify(res)) as (TopicsTweets & {
            tweets: TweetAttributes & { retweetedUser: UserAttributes[] };
          })[]
      )
      .then((data) => {
        return data
          .map((el) => {
            el.tweets.map((tweet) => {
              //@ts-ignore
              tweet.retweetedUser = tweet.retweetedUser[0];
            });

            return el.tweets;
          })
          .flat();
      });

    const finishedTopicTweets = await Promise.all([
      ...super.withLikesRetweets(topicsTweets),
    ]);

    return finishedTopicTweets as TopicsTweets[];
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
