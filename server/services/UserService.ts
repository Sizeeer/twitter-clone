import { dateNDaysAgo } from "./../utils/dateNDaysAgo";
import { QueryError } from "./../errors/QueryError";
import express from "express";
import jwt from "jsonwebtoken";
import { ModelCtor, Op, Sequelize } from "sequelize";

import { db } from "../db/db";
import { TweetAttributes } from "../types/tweetTypes";
import { createHashMd5 } from "../utils/createHash";
import { HttpError } from "./../errors/HttpError";
import {
  AuthorizedUserInterface,
  RegisterDataInterface,
  RegisterUserInterface,
  UpdateUserData,
  UserAttributes,
  UserInstance,
} from "./../types/userTypes";
import { Service } from "./Service";

const Users = db.Users;
const Tweets = db.Tweets;

class UserService extends Service {
  //Готово. В будущем смену пароля сделать
  async update(
    req: express.Request,
    body: UpdateUserData
  ): Promise<UserAttributes> {
    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    if (currentUser === null) {
      throw new HttpError("Пользователь не найден", 404);
    }

    await currentUser.update(body);

    return currentUser;
  }
  //Готово
  async getUserData(req: express.Request): Promise<UserAttributes> | null {
    const userId = req.params.id;

    const currentUser = await super.getCurrentUser(userId);

    if (currentUser === null) {
      throw new HttpError("Пользователь не найден", 404);
    }

    return currentUser;
  }
  //Готово
  async getUsersByName(req: express.Request): Promise<UserAttributes[]> {
    const queryName = req.query.name as string;

    if (queryName === void 0) {
      throw new QueryError("name", 422);
    }

    const name = queryName.toLowerCase();

    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : super.defaultLimit;

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
    const myData = super.userDataFromRequest(req);

    const subscriptionId = req.params.id;

    const currentUser = await super.getCurrentUser(myData.userId);

    const subscriptionEntity = await Users.findOne({
      where: {
        userId: subscriptionId,
      },
    });

    if (subscriptionEntity === null) {
      throw new Error("Такого пользователя не найдено!");
    }

    await currentUser.addSubscription(subscriptionEntity);
  }
  //Готово
  async unsubscribe(req: express.Request): Promise<void> {
    const myData = super.userDataFromRequest(req);

    const subscriptionId = req.params.id;

    const currentUser = await super.getCurrentUser(myData.userId);

    const subscriptionEntity = await Users.findOne({
      where: {
        userId: subscriptionId,
      },
    });

    if (subscriptionEntity === null) {
      throw new Error("Такого пользователя не найдено!");
    }

    await currentUser.removeSubscription(subscriptionEntity);
  }
  //Готово
  async getSubscribers(req: express.Request): Promise<UserAttributes[]> {
    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    const follows = await currentUser.getSubscribers({
      joinTableAttributes: [],
    });

    return follows;
  }
  //Готово
  async getSubscriptions(req: express.Request): Promise<UserAttributes[]> {
    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    const follows = await currentUser.getSubscriptions({
      joinTableAttributes: [],
    });

    return follows;
  }
  //Готово
  async afterLogin(req: express.Request): Promise<AuthorizedUserInterface> {
    const user = super.userDataFromRequest(req)
      ? super.userDataFromRequest(req)
      : undefined;

    return {
      ...user,
      token: jwt.sign({ data: req.user }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      }),
    };
  }
  //Готово
  async getLikedTweets(req: express.Request): Promise<TweetAttributes[]> {
    const myData = super.userDataFromRequest(req);

    const currentUser = await super.getCurrentUser(myData.userId);

    const likedTweets = await currentUser.getLikedTweets();

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
            [Op.gt]: dateNDaysAgo(days),
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
    const myData = super.userDataFromRequest(req);
    //TODO Проверить скорость работы с упорядовачением на уровне бд + джс и только на стороне джс
    const currentUserWithTweets = await (
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
      ...(currentUserWithTweets.retweets as TweetAttributes[]),
      ...(currentUserWithTweets.tweets as TweetAttributes[]),
    ].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return personalTweets;
  }
}

export default new UserService();
