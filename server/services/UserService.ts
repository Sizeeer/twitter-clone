import express from "express";
import jwt from "jsonwebtoken";
import { ModelCtor, Op, Sequelize, where } from "sequelize";

import { db } from "../db/db";
import { TweetAttributes, TweetInstance } from "../types/tweetTypes";
import { createHashMd5 } from "../utils/createHash";
import {
  AuthorizedUserInterface,
  RegisterDataInterface,
  RegisterUserInterface,
  UpdateUserData,
  UserAttributes,
  UserInstance,
} from "./../types/userTypes";
import TweetService from "./TweetService";

const Users = db.Users;
const Tweets = db.Tweets;

const getDateNDaysAgo = (days: number): Date => {
  return new Date(Date.now() - 1000 * 60 * 60 * 24 * days);
};

class UserService {
  private _defaultLimit = 5;

  //Готово. В будущем смену пароля сделать
  async update(
    req: express.Request,
    body: UpdateUserData
  ): Promise<UserAttributes> {
    const myData = req.user as UserAttributes;

    await Users.update(body, {
      where: {
        userId: myData.userId,
      },
    });

    const currentUser = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    return currentUser;
  }
  //Готово
  async getUserData(req: express.Request): Promise<UserAttributes> | null {
    const userId = req.params.id;

    const currentUser = await Users.findOne({
      where: {
        userId,
      },
    });

    return currentUser;
  }
  //Готово
  async getUsersByName(req: express.Request): Promise<UserAttributes[]> {
    const name = (req.query.name as string).toLowerCase();

    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : this._defaultLimit;

    const users = await Users.findAll({
      limit,
      where: {
        [Op.or]: [
          {
            name: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("name")),
              "LIKE",
              `${name}%`
            ),
          },
          {
            login: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("login")),
              "LIKE",
              `${name}%`
            ),
          },
        ],
      },
    });

    return users;
  }

  async getRecommendations(req: express.Request): Promise<UserAttributes[]> {
    const limit = +req.query.limit || 4;

    const myData = req.user as UserAttributes;
    //Fixme
    //Проверить не подписан ли я на челоека
    //Подписан ли он на меня, если да, а я на него нет то рекомендовать
    //Взять других юзеров по моей геолокации и исходя из верхних критериев рекомендовать

    const recommendations = await Users.findAll({
      limit,
      where: {
        location: {
          [Op.like]: `%${myData.location}%`,
        },
      },
    });

    return recommendations;
  }
  //Готово
  async register(data: RegisterDataInterface): Promise<UserAttributes> {
    const newUser: RegisterUserInterface = {
      name: data.name,
      login: data.login,
      password: createHashMd5(data.password + process.env.SECRET_KEY),
      confirmed: false,
      confirmHash: createHashMd5(
        Math.round(Math.random() * 500).toString() || process.env.SECRET_KEY
      ),
    };

    const registeredUser = await Users.create(newUser);

    return registeredUser;
  }
  //Готово
  async subscribe(req: express.Request): Promise<void> {
    const myData = req.user as UserAttributes;

    const subscriptionId = req.params.id;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const subscriptionEntity = await Users.findOne({
      where: {
        userId: subscriptionId,
      },
    });

    if (subscriptionEntity === null) {
      throw new Error("Такого пользователя не найдено!");
    }

    await myEntity.addSubscription(subscriptionEntity);
  }
  //Готово
  async unsubscribe(req: express.Request): Promise<void> {
    const myData = req.user as UserAttributes;

    const subscriptionId = req.params.id;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const subscriptionEntity = await Users.findOne({
      where: {
        userId: subscriptionId,
      },
    });

    if (subscriptionEntity === null) {
      throw new Error("Такого пользователя не найдено!");
    }

    await myEntity.removeSubscription(subscriptionEntity);
  }
  //Готово
  async getSubscribers(req: express.Request): Promise<UserAttributes[]> {
    const myId = (req.user as UserAttributes).userId;

    const currentUser = await Users.findOne({
      where: {
        userId: myId,
      },
    });

    const follows = await currentUser.getSubscribers({
      joinTableAttributes: [],
    });

    return follows;
  }
  //Готово
  async getSubscriptions(req: express.Request): Promise<UserAttributes[]> {
    const myId = (req.user as UserAttributes).userId;

    const currentUser = await Users.findOne({
      where: {
        userId: myId,
      },
    });

    const follows = await currentUser.getSubscriptions({
      joinTableAttributes: [],
    });

    return follows;
  }
  //Готово
  async afterLogin(req: express.Request): Promise<AuthorizedUserInterface> {
    const user = req.user ? (req.user as UserAttributes) : undefined;

    return {
      ...user,
      token: jwt.sign({ data: req.user }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      }),
    };
  }
  //Готово
  async getLikedTweets(req: express.Request): Promise<TweetAttributes[]> {
    const myData = req.user as UserAttributes;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const likedTweets = await myEntity.getLikedTweets();

    return likedTweets;
  }
  //Готово
  async getSubscriptionsTweets(
    req: express.Request
  ): Promise<TweetAttributes[]> {
    const subscriptions = await this.getSubscriptions(req);

    const days = Number(req.query.days) ? Number(req.query.days) : 1;

    let subscriptionsTweets: TweetAttributes[] = [];

    for (const subscription of subscriptions) {
      const subscriptionTweets = await subscription.getTweets({
        where: {
          createdAt: {
            [Op.gt]: getDateNDaysAgo(days),
          },
        },
        limit: 10,
      });
      subscriptionsTweets = [...subscriptionsTweets, ...subscriptionTweets];
    }

    return subscriptionsTweets;
  }
  //Готово
  async getPersonalTweets(req: express.Request): Promise<TweetAttributes[]> {
    const myData = req.user as UserAttributes;
    //TODO Проверить скорость работы с упорядовачением на уровне бд + джс и только на стороне джс
    const myEntity = await (
      Users as ModelCtor<
        UserInstance & {
          retweets: TweetAttributes[];
          tweets: TweetAttributes[];
        }
      >
    ).findOne({
      where: {
        userId: myData.userId,
      },
      include: [
        {
          model: Tweets,
          as: "retweets",
          order: [["createdAt", "DESC"]],
        },
        {
          model: Tweets,
          as: "tweets",
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    const personalTweets = [
      ...(myEntity.retweets as TweetAttributes[]),
      ...(myEntity.tweets as TweetAttributes[]),
    ].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return personalTweets;
  }
}

export default new UserService();
