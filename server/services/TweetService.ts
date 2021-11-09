import express from "express";
import { Sequelize } from "sequelize";

import { db } from "../db/db";
import { OwnerError } from "../errors/OwnerError";
import { HttpError } from "./../errors/HttpError";
import {
  CreateTweet,
  CreateTweetBody,
  TweetAttributes,
} from "./../types/tweetTypes";
import { Service } from "./Service";

const Tweets = db.Tweets;
const Topics = db.Topics;

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
  async create(req: express.Request): Promise<TweetAttributes> {
    const myData = super.userDataFromRequest(req);

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

        await createdTweet.createTopic(newTopic); //В случае дубликата ошибка
      } catch (e) {
        const currentTopic = await Topics.findOne({
          where: {
            title: body.topics[i],
          },
        });
        await currentTopic.update({ count: Sequelize.literal("count + 1") });
        await createdTweet.addTopic(currentTopic);
      }
    }

    return createdTweet;
  }
  //Готово
  async delete(req: express.Request): Promise<void> {
    const tweetId = req.params.id;

    const myData = super.userDataFromRequest(req);

    const currentTweet = await this.getCurrentTweet(tweetId);

    if (currentTweet.userId !== myData.userId) {
      throw new OwnerError("Вы не владелец твита", 401);
    }

    const topics = await currentTweet.getTopics();

    await currentTweet.destroy();

    for (let i = 0; i < topics.length; i++) {
      const currentTopic = await Topics.findOne({
        where: {
          title: topics[i].title,
        },
      });
      topics[i].count > 1
        ? await currentTopic.update({ count: Sequelize.literal("count - 1") })
        : await currentTopic.destroy();
    }
  }
}
export default new TweetService();
