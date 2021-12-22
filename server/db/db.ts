import { ModelCtor, Sequelize } from "sequelize";

import { ChatInstance } from "../../shared/types/chatTypes";
import { TopicInstance } from "../../shared/types/topicTypes";
import { TweetInstance } from "../../shared/types/tweetTypes";
import {
  CompanionChatInstance,
  UserChatInstance,
} from "../../shared/types/userChatTypes";
import { MessageInstance } from "./../../shared/types/messageTypes";
import { UserInstance } from "./../../shared/types/userTypes";
import ChatModel from "./models/ChatModel";
import CompanionChatModel from "./models/CompanionChatModel";
import MessageModel from "./models/MessageModel";
import TopicModel from "./models/TopicModel";
import TweetModel from "./models/TweetModel";
import UserChatModel from "./models/UserChatModel";
import UserModel from "./models/UserModel";

interface DB {
  sequelize: Sequelize;
  Users: ModelCtor<UserInstance>;
  Topics: ModelCtor<TopicInstance>;
  Tweets: ModelCtor<TweetInstance>;
  Chats: ModelCtor<ChatInstance>;
  UsersChats: ModelCtor<UserChatInstance>;
  CompanionsChats: ModelCtor<CompanionChatInstance>;
  Messages: ModelCtor<MessageInstance>;
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
  Chats: ChatModel(sequelize),
  UsersChats: UserChatModel(sequelize),
  CompanionsChats: CompanionChatModel(sequelize),
  Messages: MessageModel(sequelize),
};

db.Chats.hasMany(db.Messages, {
  foreignKey: "chatroom_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "messages",
});
db.Messages.belongsTo(db.Chats, {
  foreignKey: "chatroom_id",
  as: "chat",
});

db.Chats.hasOne(db.UsersChats, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "chatroom_id",
  as: "userChat",
});
db.UsersChats.belongsTo(db.Chats, {
  as: "chat",
  foreignKey: "chatroom_id",
});

db.Users.hasOne(db.UsersChats, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "userId",
  as: "userChat",
});
db.UsersChats.belongsTo(db.Users, {
  as: "user",
  foreignKey: "userId",
});

db.Chats.hasOne(db.CompanionsChats, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "chatroom_id",
  as: "companionChat",
});
db.CompanionsChats.belongsTo(db.Chats, {
  as: "chat",
  foreignKey: "chatroom_id",
});

db.Users.hasOne(db.CompanionsChats, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "userId",
  as: "companionChat",
});
db.CompanionsChats.belongsTo(db.Users, {
  as: "user",
  foreignKey: "userId",
});

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
  as: "user",
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
  as: "retweetedUser",
});

db.Users.belongsToMany(db.Tweets, {
  through: "LikedTweets",
  foreignKey: "userId",
  as: "likedTweets",
  onDelete: "CASCADE",
});

db.Tweets.belongsToMany(db.Users, {
  through: "LikedTweets",
  foreignKey: "tweetId",
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
