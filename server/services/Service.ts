import { Sequelize } from "sequelize";
import { UserInstance } from "../../shared/types/userTypes";
import { db } from "../db/db";

const Users = db.Users;

class Service {
  async getCurrentUser(userId: string): Promise<UserInstance> {
    return Users.findOne({
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
  }

  public withLikesRetweets(arr: any[]) {
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
}

export { Service };
