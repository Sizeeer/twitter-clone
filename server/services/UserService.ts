import express from "express";
import { ModelCtor, Op, Sequelize } from "sequelize";

import { TweetAttributes } from "../../shared/types/tweetTypes";
import { db } from "../db/db";
import { createHashMd5 } from "../utils/createHash";
import {
  RegisterDataInterface,
  RegisterUserInterface,
  UpdateUserData,
  UserAttributes,
  UserInstance,
} from "./../../shared/types/userTypes";
import { HttpError } from "./../errors/HttpError";
import { QueryError } from "./../errors/QueryError";
import { dateNDaysAgo } from "./../utils/dateNDaysAgo";
import { Service } from "./Service";

const Users = db.Users;
const Tweets = db.Tweets;

class UserService extends Service {
  //Готово. В будущем смену пароля сделать
  async update(
    currentUser: UserInstance,
    body: UpdateUserData
  ): Promise<UserAttributes> {
    if (currentUser === null) {
      throw new HttpError("Пользователь не найден", 404);
    }
    await currentUser.update(body);

    return currentUser;
  }
  //Готово
  async getUserData(
    currentUser: UserInstance
  ): Promise<Omit<UserAttributes, "password" | "confirmHash">> | null {
    if (currentUser === null) {
      throw new HttpError("Пользователь не найден", 404);
    }

    delete currentUser.password;
    delete currentUser.confirmHash;

    return currentUser;
  }
  //Готово
  async me(
    currentUser: UserInstance
  ): Promise<Omit<UserAttributes, "password" | "confirmHash">> | null {
    if (currentUser === null) {
      throw new HttpError("Пользователь не найден", 404);
    }

    delete currentUser.password;
    delete currentUser.confirmHash;

    return currentUser;
  }
  //Готово
  async getUsersByName(
    queryName: string,
    limit: number
  ): Promise<UserAttributes[]> {
    if (queryName === undefined) {
      throw new QueryError("name", 422);
    }

    const name = queryName.toLowerCase();

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
  async register(data: RegisterDataInterface): Promise<void> {
    const newUser: RegisterUserInterface = {
      name: data.name,
      login: data.login,
      password: createHashMd5(data.password + process.env.SECRET_KEY),
      confirmed: false,
      confirmHash: createHashMd5(
        Math.round(Math.random() * 500).toString() || process.env.SECRET_KEY
      ),
    };

    await Users.create(newUser);
  }
  //Готово
  async subscribe(
    myData: UserAttributes,
    subscriptionId: string
  ): Promise<void> {
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
  async unsubscribe(
    myData: UserAttributes,
    subscriptionId: string
  ): Promise<void> {
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
  async getSubscribers(myData: UserAttributes): Promise<UserAttributes[]> {
    const currentUser = await super.getCurrentUser(myData.userId);

    const follows = await currentUser.getSubscribers({
      joinTableAttributes: [],
    });

    return follows;
  }
  //Готово
  async getSubscriptions(myDataId: string): Promise<UserAttributes[]> {
    const currentUser = await super.getCurrentUser(myDataId);

    const follows = await currentUser.getSubscriptions({
      joinTableAttributes: [],
    });

    return follows;
  }
  //Готово
  async getLikedTweets(myDataId: string): Promise<TweetAttributes[]> {
    const currentUser = await super.getCurrentUser(myDataId);

    const likedTweets = await currentUser.getLikedTweets({
      include: [
        {
          model: Users,
          as: "likedUser",
        },
      ],
    });

    return likedTweets;
  }
  //Готово
  async getSubscriptionsTweets(
    myDataId: string,
    days: number
  ): Promise<TweetAttributes[]> {
    const subscriptions = await this.getSubscriptions(myDataId);

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
  async getPersonalTweets(myDataId: string): Promise<TweetAttributes[]> {
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
        userId: myDataId,
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
