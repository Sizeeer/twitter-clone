import express from "express";

import { db } from "../db/db";
import { TopicAttributes } from "../../shared/types/topicTypes";
import { UserAttributes } from "./../../shared/types/userTypes";
import { Service } from "./Service";

const Users = db.Users;

class RecommendationService extends Service {
  async getPeople(
    myData: UserAttributes,
    limit: number
  ): Promise<UserAttributes[]> {
    //Возвращает людей по этим критериям: 1) в моей локации, 2) на которых я не подписан, 3) которые подписаны на меня

    const currentUser = await super.getCurrentUser(myData.userId);

    const mySubscriptions = await currentUser.getSubscriptions();

    const selectedBySubLocation = await Promise.all([
      Users.sequelize
        .query(
          `select * from "Users" as u where similarity(u.location, '${myData.location}') >= 0.5 and u."userId" != '${myData.userId}' ORDER BY similarity(location, '${myData.location}') DESC;`
        )
        .then((res) => res[0]),
      currentUser.getSubscribers(),
    ]).then((records) => [...new Set(records.flat())] as UserAttributes[]);

    const recommendationUsers = selectedBySubLocation
      .filter((el) => {
        let result = true;
        for (let i = 0; i < mySubscriptions.length; i++) {
          if (mySubscriptions[i].login === (el as UserAttributes).login) {
            result = false;
            break;
          }
        }
        return result;
      })
      .slice(0, limit);

    return recommendationUsers;
  }

  async getTopics(
    myData: UserAttributes,
    limit: number
  ): Promise<TopicAttributes[]> {
    //Получить темы твитов юзеров, которые в моей локации
    const usersInMyLocation = await Users.sequelize
      .query(
        `select * from "Users" as u where similarity(u.location, '${myData.location}') >= 0.5 and u."userId" != '${myData.userId}' ORDER BY similarity(location, '${myData.location}') DESC;`
      )
      .then((res) => res[0] as UserAttributes[]);

    let topicsTweets: TopicAttributes[] = [];

    for (const userInMyLocation of usersInMyLocation) {
      const user = await Users.findOne({
        where: {
          userId: userInMyLocation.userId,
        },
      });
      const tweets = await user.getTweets();

      for (const tweet of tweets) {
        const topics = await tweet.getTopics({
          order: [["count", "DESC"]],
        });
        topicsTweets = [...topicsTweets, ...topics];
      }
    }

    const topicsTweetsTitles = topicsTweets.map((el) => el.title);

    const resultTopicsTweets = topicsTweets
      .filter((el, i) => !topicsTweetsTitles.includes(el.title, i + 1))
      .slice(0, limit);

    return resultTopicsTweets;
  }
}

export default new RecommendationService();
