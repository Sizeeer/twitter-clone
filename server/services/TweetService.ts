import { Sequelize } from "sequelize";
import { UserAttributes } from "./../types/userTypes";
import { TweetAttributes } from "./../types/tweetTypes";
import express from "express";

import { CustomCreateTweetRequest } from "../core/coreTypes";
import { db, sequelize } from "../db/db";
import TopicService from "./TopicService";

const Tweets = db.Tweets;
const Users = db.Users;
const Topics = db.Topics;

interface CreateTweet {
  userId: string;
  images: string[];
  text: string;
}

interface CreateTweetBody {
  text: string;
  images: string[];
  topics: string[];
}

class TweetService {
  //Готово
  async like(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = req.user as UserAttributes;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const tweetEntity = await Tweets.findOne({
      where: {
        tweetId: tweetId,
      },
    });

    if (tweetEntity === null) {
      throw new Error("Такого твита не найдено!");
    }

    await myEntity.addLikedTweet(tweetEntity);
  }
  //Готово
  async unlike(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = req.user as UserAttributes;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const tweetEntity = await Tweets.findOne({
      where: {
        tweetId: tweetId,
      },
    });

    if (tweetEntity === null) {
      throw new Error("Такого твита не найдено!");
    }

    await myEntity.removeLikedTweet(tweetEntity);
  }
  //Готово
  async retweet(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = req.user as UserAttributes;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const tweetEntity = await Tweets.findOne({
      where: {
        tweetId: tweetId,
      },
    });

    if (tweetEntity === null) {
      throw new Error("Такого твита не найдено!");
    }

    await myEntity.addRetweet(tweetEntity);
  }
  //Готово
  async create(req: express.Request): Promise<TweetAttributes> {
    const myData = req.user as UserAttributes;

    const body = req.body as CreateTweetBody;

    const newTweet: CreateTweet = {
      text: body.text,
      images: body.images,
      userId: myData.userId,
    };

    const createdTweet = await Tweets.create(newTweet);
    for (let i = 0; i < body.topics.length; i++) {
      try {
        const newTopic = {
          title: body.topics[i],
        };

        await createdTweet.createTopic(newTopic);
      } catch (e) {
        await Topics.update(
          { count: Sequelize.literal("count + 1") },
          {
            where: {
              title: body.topics[i],
            },
          }
        );
        const currentTopic = await Topics.findOne({
          where: {
            title: body.topics[i],
          },
        });
        await createdTweet.addTopic(currentTopic);
      }
    }

    return createdTweet;
  }
  //Готово
  async delete(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = req.user as UserAttributes;

    const currentTweet = await Tweets.findOne({ where: { tweetId } });

    const topics = await currentTweet.getTopics();

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].count > 1) {
        await Topics.update(
          { count: Sequelize.literal("count - 1") },
          {
            where: {
              topicId: topics[i].topicId,
            },
          }
        );
      } else {
        await Topics.destroy({
          where: {
            topicId: topics[i].topicId,
          },
        });
      }
    }

    await Tweets.destroy({
      where: {
        tweetId,
        userId: myData.userId,
      },
    });
  }
}
export default new TweetService();
