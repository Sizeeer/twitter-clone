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
  async update(userId: string, body: UpdateUserData): Promise<UserAttributes> {
    let currentUser = await Users.findOne({
      where: {
        userId,
      },
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("subscribers.userId")),
            "subscribersCount",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("subscriptions.userId")),
            "subscriptionsCount",
          ],
        ],
      },
      include: [
        {
          model: Users,
          as: "subscribers",
          attributes: [],
        },
        {
          model: Users,
          as: "subscriptions",
          attributes: [],
        },
      ],
      //@ts-ignore
      includeIgnoreAttributes: false,
      group: ["User.userId"],
    });
    currentUser.name = body.name || currentUser.name;
    currentUser.description = body.description || currentUser.description;
    currentUser.location = body.location || currentUser.location;
    currentUser.avatar =
      body.avatar === null ? null : body.avatar || currentUser.avatar;
    currentUser.backgroundImage =
      body.backgroundImage === null
        ? null
        : body.backgroundImage || currentUser.backgroundImage;
    await currentUser
      .save()
      .then((res) => JSON.parse(JSON.stringify(res)))
      .then((data) => {
        data.subscribersCount = +data.subscribersCount;
        data.subscriptions = +data.subscriptions;
        return data;
      });

    return currentUser;
  }
  //Готово
  async getUserData(
    userId: string
  ): Promise<Omit<UserAttributes, "password" | "confirmHash">> | null {
    const currentUser = await Users.findOne({
      where: {
        userId,
      },
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("subscribers.userId")),
            "subscribersCount",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("subscriptions.userId")),
            "subscriptionsCount",
          ],
        ],
      },
      include: [
        {
          model: Users,
          as: "subscribers",
          attributes: [],
        },
        {
          model: Users,
          as: "subscriptions",
          attributes: [],
        },
      ],
      //@ts-ignore
      includeIgnoreAttributes: false,
      group: ["User.userId"],
    })
      .then((res) => JSON.parse(JSON.stringify(res)))
      .then((data) => {
        data.subscribersCount = +data.subscribersCount;
        data.subscriptions = +data.subscriptions;

        return data;
      });

    delete currentUser.password;
    delete currentUser.confirmHash;

    return currentUser;
  }
  //Готово
  async me(
    userId: string
  ): Promise<Omit<UserAttributes, "password" | "confirmHash">> | null {
    const currentUser = await Users.findOne({
      where: {
        userId,
      },
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("subscribers.userId")),
            "subscribersCount",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("subscriptions.userId")),
            "subscriptionsCount",
          ],
        ],
      },
      include: [
        {
          model: Users,
          as: "subscribers",
          attributes: [],
        },
        {
          model: Users,
          as: "subscriptions",
          attributes: [],
        },
      ],
      //@ts-ignore
      includeIgnoreAttributes: false,
      group: ["User.userId"],
    })
      .then((res) => JSON.parse(JSON.stringify(res)))
      .then((data) => {
        data.subscribersCount = +data.subscribersCount;
        data.subscriptions = +data.subscriptions;

        return data;
      });

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
  ): Promise<string> {
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

    return subscriptionEntity.login;
  }
  //Готово
  async unsubscribe(
    myData: UserAttributes,
    subscriptionId: string
  ): Promise<string> {
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

    return subscriptionEntity.login;
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

  private withLikesRetweets(arr: any[]) {
    return arr.map(async (tweet) => {
      const tweetId = tweet.tweetId;
      const likes = await Users.sequelize
        .query(
          `select COUNT("LikedTweets"."tweetId") from "LikedTweets" where "LikedTweets"."tweetId" = '${tweetId}';`
        ) //@ts-ignore
        .then((res) => +res[0][0].count);
      const retweets = await Users.sequelize
        .query(
          `select COUNT("Retweets"."tweetId") from "Retweets" where "Retweets"."tweetId" = '${tweetId}';`
        ) //@ts-ignore
        .then((res) => +res[0][0].count);
      tweet.retweets = retweets;
      tweet.likes = likes;
      return tweet;
    });
  }
  //Готово
  async getSubscriptionsTweets(
    myDataId: string,
    days: number,
    limit: number,
    page: number
  ): Promise<TweetAttributes[]> {
    const subscriptions = await this.getSubscriptions(myDataId);

    let subscriptionsTweets: TweetAttributes[] = [];

    for (const subscription of subscriptions) {
      const tweetsWithSubs = await Tweets.findAll({
        where: {
          userId: subscription.userId,
          createdAt: {
            [Op.gt]: dateNDaysAgo(days),
          },
        },
        limit,
        offset: (page - 1) * limit,
        include: {
          model: Users,
          as: "user",
        },
        order: [["createdAt", "DESC"]],
      }).then((res) => JSON.parse(JSON.stringify(res)));

      subscriptionsTweets = [...subscriptionsTweets, ...tweetsWithSubs];
    }

    const myTweetsWithUserData = await Tweets.findAll({
      where: {
        userId: myDataId,
        createdAt: {
          [Op.gt]: dateNDaysAgo(days),
        },
      },
      limit,
      offset: (page - 1) * limit,
      include: {
        model: Users,
        as: "user",
      },
      order: [["createdAt", "DESC"]],
    }).then((res) => JSON.parse(JSON.stringify(res)));

    const finishedTweets = await Promise.all([
      ...this.withLikesRetweets(myTweetsWithUserData),
      ...this.withLikesRetweets(subscriptionsTweets),
    ]);

    return [
      ...finishedTweets.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    ];
  }
  async getAllSubscriptionsTweets(
    myDataId: string,
    days: number
  ): Promise<TweetAttributes[]> {
    const subscriptions = await this.getSubscriptions(myDataId);

    let subscriptionsTweets: TweetAttributes[] = [];

    for (const subscription of subscriptions) {
      const tweetsWithSubs = await Tweets.findAll({
        where: {
          userId: subscription.userId,
          createdAt: {
            [Op.gt]: dateNDaysAgo(days),
          },
        },
        include: {
          model: Users,
          as: "user",
        },
        order: [["createdAt", "DESC"]],
      }).then((res) => JSON.parse(JSON.stringify(res)));

      subscriptionsTweets = [...subscriptionsTweets, ...tweetsWithSubs];
    }

    const myTweetsWithUserData = await Tweets.findAll({
      where: {
        userId: myDataId,
        createdAt: {
          [Op.gt]: dateNDaysAgo(days),
        },
      },
      include: {
        model: Users,
        as: "user",
      },
      order: [["createdAt", "DESC"]],
    }).then((res) => JSON.parse(JSON.stringify(res)));

    const finishedTweets: TweetAttributes[] = await Promise.all([
      ...this.withLikesRetweets(myTweetsWithUserData),
      ...this.withLikesRetweets(subscriptionsTweets),
    ]);

    return [
      ...finishedTweets.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    ];
  }
  //Готово
  async getPersonalTweets(
    myDataId: string,
    days: number,
    limit: number,
    page: number
  ): Promise<TweetAttributes[]> {
    //TODO Проверить скорость работы с упорядовачением на уровне бд + джс и только на стороне джс
    const myData = await super.getCurrentUser(myDataId);

    const tweets = await myData
      .getTweets({
        include: [
          {
            model: Users,
            as: "user",
          },
        ],
        where: {
          createdAt: {
            [Op.gt]: days,
          },
        },
        offset: (page - 1) * limit,
        limit,
        order: [["createdAt", "DESC"]],
      })
      .then((res) => JSON.parse(JSON.stringify(res)) as TweetAttributes[]);

    const retweets = await myData
      .getRetweets({
        include: [
          {
            model: Users,
            as: "user",
          },
          {
            model: Users,
            as: "retweetedUser",
          },
        ],
        where: {
          createdAt: {
            [Op.gt]: days,
          },
        },
        offset: (page - 1) * limit,
        limit,
        order: [["createdAt", "DESC"]],
      })
      .then(
        (res) =>
          JSON.parse(JSON.stringify(res)) as (TweetAttributes & {
            retweetedUser: UserAttributes[];
          })[]
      )
      .then((data) => {
        return data.map((el) => {
          //@ts-ignore
          el.retweetedUser = el.retweetedUser[0];
          return el;
        });
      });

    const dataWithLikes = await Promise.all([
      ...this.withLikesRetweets(tweets),
      ...this.withLikesRetweets(retweets),
    ]);

    const personalTweets = [...dataWithLikes]
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .slice(0, limit);

    return personalTweets;
  }

  async getAllPersonalTweets(
    myDataId: string,
    days: number
  ): Promise<TweetAttributes[]> {
    //TODO Проверить скорость работы с упорядовачением на уровне бд + джс и только на стороне джс
    const myData = await super.getCurrentUser(myDataId);

    const tweets = await myData
      .getTweets({
        include: [
          {
            model: Users,
            as: "user",
          },
        ],
        where: {
          createdAt: {
            [Op.gt]: days,
          },
        },
        order: [["createdAt", "DESC"]],
      })
      .then((res) => JSON.parse(JSON.stringify(res)) as TweetAttributes[]);

    const retweets = await myData
      .getRetweets({
        include: [
          {
            model: Users,
            as: "retweetedUser",
          },
          {
            model: Users,
            as: "user",
          },
        ],
        where: {
          createdAt: {
            [Op.gt]: days,
          },
        },
        order: [["createdAt", "DESC"]],
      })
      .then((res) => JSON.parse(JSON.stringify(res)));

    const dataWithLikes = await Promise.all([
      ...this.withLikesRetweets(tweets),
      ...this.withLikesRetweets(retweets),
    ]);

    const personalTweets = [...dataWithLikes].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return personalTweets;
  }

  //Готово
  async getLikedTweets(
    myDataId: string,
    days: number,
    limit: number,
    page: number
  ): Promise<TweetAttributes[]> {
    const myData = await super.getCurrentUser(myDataId);

    const tweets = await myData
      .getLikedTweets({
        include: [
          {
            model: Users,
            as: "user",
          },
          {
            model: Users,
            as: "retweetedUser",
          },
        ],
        offset: (page - 1) * limit,
        limit,
        order: [["createdAt", "DESC"]],
      })
      .then(
        (res) =>
          JSON.parse(JSON.stringify(res)) as (TweetAttributes & {
            retweetedUser: UserAttributes[];
          })[]
      )
      .then((data) => {
        return data.map((el) => {
          //@ts-ignore
          el.retweetedUser = el.retweetedUser[0];
          return el;
        });
      });

    const likedTweets = await Promise.all([...this.withLikesRetweets(tweets)]);

    return likedTweets;
  }

  async getAllLikedTweets(
    myDataId: string,
    days: number
  ): Promise<TweetAttributes[]> {
    const myData = await super.getCurrentUser(myDataId);

    const likedTweets = await myData
      .getLikedTweets({
        include: [
          {
            model: Users,
            as: "user",
          },
          {
            model: Users,
            as: "retweetedUser",
          },
        ],
        order: [["createdAt", "DESC"]],
      })
      .then((res) => JSON.parse(JSON.stringify(res)) as TweetAttributes[]);

    return likedTweets;
  }
}

export default new UserService();
