import express from "express";

import { db } from "../db/db";
import { TopicAttributes } from "../types/topicTypes";
import { UserAttributes } from "./../types/userTypes";

const Users = db.Users;
const Topics = db.Topics;
const Tweets = db.Tweets;
class RecommendationService {
  private _defaultLimit = 3;

  async getPeople(req: express.Request): Promise<UserAttributes[]> {
    const myData = req.user as UserAttributes;

    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : this._defaultLimit;

    const myEntity = await Users.findOne({
      where: {
        userId: myData.userId,
      },
    });

    const mySubscriptions = await myEntity.getSubscriptions();

    const recommendationByLocation = await Promise.all([
      Users.sequelize
        .query(
          `select * from "Users" as u where similarity(u.location, '${myData.location}') >= 0.5 and u."userId" != '${myData.userId}' ORDER BY similarity(location, '${myData.location}') DESC;`
        )
        .then((res) => res[0]),
      myEntity.getSubscribers(),
    ]).then((records) => [...new Set(records.flat())] as UserAttributes[]);

    const recommendationUsers = recommendationByLocation.filter((el) => {
      let result = true;
      for (let i = 0; i < mySubscriptions.length; i++) {
        if (mySubscriptions[i].login === (el as UserAttributes).login) {
          result = false;
          break;
        }
      }
      return result;
    });
    //@ts-ignore
    return recommendationUsers;
  }

  async getTopics(req: express.Request): Promise<TopicAttributes[]> {
    const myData = req.user as UserAttributes;

    const limit = Number(req.query.limit)
      ? Number(req.query.limit)
      : this._defaultLimit;

    const users = await Users.sequelize
      .query(
        `select * from "Users" as u where similarity(u.location, '${myData.location}') >= 0.5 and u."userId" != '${myData.userId}' ORDER BY similarity(location, '${myData.location}') DESC;`
      )
      .then((res) => res[0] as UserAttributes[]);

    let topicsTweets: TopicAttributes[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = await Users.findOne({
        where: {
          userId: users[i].userId,
        },
      });
      const tweets = await user.getTweets();

      for (let j = 0; j < tweets.length; j++) {
        const topics = await tweets[j].getTopics({
          order: [["count", "DESC"]],
        });
        topicsTweets = [...topicsTweets, ...topics];
      }
    }

    const topicsTweetsTitles = topicsTweets.map((el) => el.title);

    return topicsTweets
      .filter((el, i) => !topicsTweetsTitles.includes(el.title, i + 1))
      .slice(0, limit);
  }
}

export default new RecommendationService();
