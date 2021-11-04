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

import { TweetAttributes } from "./tweetTypes";

export interface TopicAttributes {
  topicId?: string;
  title: string;
  count?: number;

  //Tweets
  getTweets?: BelongsToManyGetAssociationsMixin<TweetAttributes>;
  addTweet?: BelongsToManyAddAssociationMixin<TweetAttributes, string>;
  addTweets?: BelongsToManyAddAssociationsMixin<TweetAttributes, string>;
  removeTweet?: BelongsToManyRemoveAssociationMixin<TweetAttributes, string>;
  removeTweets?: BelongsToManyRemoveAssociationsMixin<TweetAttributes, string>;
  countTweets?: BelongsToManyCountAssociationsMixin;
  hasTweet?: BelongsToManyHasAssociationMixin<TweetAttributes, string>;
  hasTweets?: BelongsToManyHasAssociationsMixin<TweetAttributes, string>;
  setTweets?: BelongsToManySetAssociationsMixin<TweetAttributes, string>;
  createTweet?: BelongsToManyCreateAssociationMixin<TweetAttributes>;
}

interface TopicCreationAttributes
  extends Optional<TopicAttributes, "topicId" | "count"> {}

export interface TopicInstance
  extends Model<TopicAttributes, TopicCreationAttributes>,
    TopicAttributes {}
