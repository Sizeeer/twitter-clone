import { ModelCtor, Sequelize } from "sequelize";

import { TopicInstance } from "../types/topicTypes";
import { UserInstance } from "../types/userTypes";
import { TweetInstance } from "./../types/tweetTypes";
import TopicModel from "./models/TopicModel";
import TweetModel from "./models/TweetModel";
import UserModel from "./models/UserModel";

interface DB {
  sequelize: Sequelize;
  Users: ModelCtor<UserInstance>;
  Topics: ModelCtor<TopicInstance>;
  Tweets: ModelCtor<TweetInstance>;
}

const dbUsername = process.env.DB_USERNAME,
  dbPassword = process.env.DB_PASSWORD,
  dbHost = process.env.DB_HOST,
  dbPort = process.env.DB_PORT,
  dbName = process.env.DB_NAME;

export const sequelize = new Sequelize(
  `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
);

export const db: DB = {
  sequelize,
  Users: UserModel(sequelize),
  Topics: TopicModel(sequelize),
  Tweets: TweetModel(sequelize),
};

db.Users.belongsToMany(db.Users, {
  through: "Subscriptions",
  foreignKey: "subscriptionId",
  as: "subscribers",
});
db.Users.belongsToMany(db.Users, {
  through: "Subscriptions",
  foreignKey: "userId",
  as: "subscriptions",
});

db.Users.hasMany(db.Tweets, {
  foreignKey: "userId",
  as: "tweets",
  onDelete: "CASCADE",
});
db.Tweets.belongsTo(db.Users, {
  foreignKey: "userId",
  as: "users",
});

db.Tweets.belongsToMany(db.Topics, {
  through: "TweetsTopics",
  foreignKey: "tweetId",
  as: "topics",
  onDelete: "CASCADE",
});

db.Topics.belongsToMany(db.Tweets, {
  through: "TweetsTopics",
  foreignKey: "topicId",
  as: "tweets",
  onDelete: "CASCADE",
});

db.Users.belongsToMany(db.Tweets, {
  through: "Retweets",
  foreignKey: "userId",
  as: "retweets",
  onDelete: "CASCADE",
});

db.Tweets.belongsToMany(db.Users, {
  through: "Retweets",
  foreignKey: "tweetId",
  as: "retweetedUsers",
});

db.Users.belongsToMany(db.Tweets, {
  through: "LikedTweets",
  foreignKey: "userId",
  as: "likedTweets",
});

db.Tweets.belongsToMany(db.Users, {
  through: "LikedTweets",
  foreignKey: "likedTweetId",
  as: "likedUsers",
});

export const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    console.log("DB OK!");
  } catch (e) {
    console.log("DB NOT OK!");
    throw new Error(e.message);
  }
};
