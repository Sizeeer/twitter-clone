import { HttpError } from "./../errors/HttpError";
import express from "express";
import { Sequelize } from "sequelize";

import { db } from "../db/db";
import { TweetAttributes } from "./../types/tweetTypes";
import { UserAttributes } from "./../types/userTypes";
import { Service } from "./Service";

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

class TweetService extends Service {
  private async getCurrentTweet(tweetId: string) {
    return Tweets.findOne({
      where: {
        tweetId,
      },
    });
  }
  //Готово
  async like(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    const currentTweet = await this.getCurrentTweet(tweetId);

    if (currentTweet === null) {
      throw new HttpError("Такого твита не найдено!", 404);
    }

    await currentUser.addLikedTweet(currentTweet);
  }
  //Готово
  async unlike(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    const currentTweet = await this.getCurrentTweet(tweetId);

    if (currentTweet === null) {
      throw new HttpError("Такого твита не найдено!", 404);
    }

    await currentUser.removeLikedTweet(currentTweet);
  }
  //Готово
  async retweet(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    const currentTweet = await this.getCurrentTweet(tweetId);

    if (currentTweet === null) {
      throw new HttpError("Такого твита не найдено!", 404);
    }

    await currentUser.addRetweet(currentTweet);
  }
  //Готово
  //Fixme здесь остановился на рефакторинге
  async create(req: express.Request): Promise<TweetAttributes> {
    const myData = super.userDataFromRequest(req);

    const body = req.body as CreateTweetBody;

    const newTweet: CreateTweet = {
      text: body.text,
      images: body.images,
      userId: myData.userId,
    };
    console.log(body);

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

    const myData = super.userDataFromRequest(req);

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
