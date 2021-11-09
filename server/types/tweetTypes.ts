import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  Model,
  Optional,
} from "sequelize";
import { TopicAttributes } from "./topicTypes";
import { UserAttributes } from "./userTypes";

export interface CreateTweet {
  userId: string;
  images: string[];
  text: string;
}

export interface CreateTweetBody {
  text: string;
  images: string[];
  topics: string[];
}

export interface TweetAttributes {
  tweetId: string;
  userId: string;
  images: string[];
  text: string;
  createdAt?: Date;
  updatedAt?: Date;

  //Users
  getUser?: BelongsToManyGetAssociationsMixin<UserAttributes>;
  setUser?: BelongsToManySetAssociationsMixin<UserAttributes, string>;
  createUser?: BelongsToManyCreateAssociationMixin<UserAttributes>;

  //Topics
  getTopics?: BelongsToManyGetAssociationsMixin<TopicAttributes>;
  addTopic?: BelongsToManyAddAssociationMixin<TopicAttributes, string>;
  addTopics?: BelongsToManyAddAssociationsMixin<TopicAttributes, string>;
  removeTopic?: BelongsToManyRemoveAssociationMixin<TopicAttributes, string>;
  removeTopics?: BelongsToManyRemoveAssociationsMixin<TopicAttributes, string>;
  countTopics?: BelongsToManyCountAssociationsMixin;
  hasTopic?: BelongsToManyHasAssociationMixin<TopicAttributes, string>;
  hasTopics?: BelongsToManyHasAssociationsMixin<TopicAttributes, string>;
  setTopics?: BelongsToManySetAssociationsMixin<TopicAttributes, string>;
  createTopic?: BelongsToManyCreateAssociationMixin<TopicAttributes>;

  //LikedUsers
  getLikedUsers?: BelongsToManyGetAssociationsMixin<UserAttributes>;
  addLikedUser?: BelongsToManyAddAssociationMixin<UserAttributes, string>;
  addLikedUsers?: BelongsToManyAddAssociationsMixin<UserAttributes, string>;
  removeLikedUser?: BelongsToManyRemoveAssociationMixin<UserAttributes, string>;
  removeLikedUsers?: BelongsToManyRemoveAssociationsMixin<
    UserAttributes,
    string
  >;
  countLikedUsers?: BelongsToManyCountAssociationsMixin;
  hasLikedUser?: BelongsToManyHasAssociationMixin<UserAttributes, string>;
  hasLikedUsers?: BelongsToManyHasAssociationsMixin<UserAttributes, string>;
  setLikedUsers?: BelongsToManySetAssociationsMixin<UserAttributes, string>;
  createLikedUser?: BelongsToManyCreateAssociationMixin<UserAttributes>;

  //RetweetedUsers
  getRetweetedUsers?: BelongsToManyGetAssociationsMixin<UserAttributes>;
  addRetweetedUser?: BelongsToManyAddAssociationMixin<UserAttributes, string>;
  addRetweetedUsers?: BelongsToManyAddAssociationsMixin<UserAttributes, string>;
  removeRetweetedUser?: BelongsToManyRemoveAssociationMixin<
    UserAttributes,
    string
  >;
  removeRetweetedUsers?: BelongsToManyRemoveAssociationsMixin<
    UserAttributes,
    string
  >;
  countRetweetedUsers?: BelongsToManyCountAssociationsMixin;
  hasRetweetedUser?: BelongsToManyHasAssociationMixin<UserAttributes, string>;
  hasRetweetedUsers?: BelongsToManyHasAssociationsMixin<UserAttributes, string>;
  setRetweetedUsers?: BelongsToManySetAssociationsMixin<UserAttributes, string>;
  createRetweetedUser?: BelongsToManyCreateAssociationMixin<UserAttributes>;
}

interface TweetCreationAttributes
  extends Optional<TweetAttributes, "tweetId"> {}

export interface TweetInstance
  extends Model<TweetAttributes, TweetCreationAttributes>,
    TweetAttributes {}
