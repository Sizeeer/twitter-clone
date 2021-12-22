import { MessageAttributes } from "./messageTypes";
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
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
} from "../../server/types";
import { TweetAttributes } from "./tweetTypes";

export interface UpdateUserData {
  name?: string;
  description?: string;
  location?: string;
  avatar?: string;
  backgroundImage?: string;
}

export interface RegisterDataInterface {
  login: string;
  name: string;
  password: string;
  password2: string;
}

export interface RegisterUserInterface {
  name: string;
  login: string;
  password: string;
  confirmed: boolean;
  confirmHash: string;
}

export interface UserAttributes {
  userId: string;
  name: string;
  login: string;
  password: string;
  confirmed: boolean;
  confirmHash: string;
  description?: string;
  location?: string;
  avatar?: string;
  backgroundImage?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // //Messages
  // getMessages?: HasManyGetAssociationsMixin<MessageAttributes>;
  // addMessage?: HasManyAddAssociationMixin<MessageAttributes, string>;
  // removeMessage?: HasManyRemoveAssociationMixin<MessageAttributes, string>;
  // createMessage?: HasManyCreateAssociationMixin<MessageAttributes>;

  //Subscriptions
  getSubscriptions?: BelongsToManyGetAssociationsMixin<UserAttributes>;
  addSubscription?: BelongsToManyAddAssociationMixin<UserAttributes, string>;
  addSubscriptions?: BelongsToManyAddAssociationsMixin<UserAttributes, string>;
  removeSubscription?: BelongsToManyRemoveAssociationMixin<
    UserAttributes,
    string
  >;
  removeSubscriptions?: BelongsToManyRemoveAssociationsMixin<
    UserAttributes,
    string
  >;
  countSubscriptions?: BelongsToManyCountAssociationsMixin;
  hasSubscription?: BelongsToManyHasAssociationMixin<UserAttributes, string>;
  hasSubscriptions?: BelongsToManyHasAssociationsMixin<UserAttributes, string>;
  setSubscriptions?: BelongsToManySetAssociationsMixin<UserAttributes, string>;
  createSubscription?: BelongsToManyCreateAssociationMixin<UserAttributes>;

  //Subscribers
  getSubscribers?: BelongsToManyGetAssociationsMixin<UserAttributes>;
  addSubscriber?: BelongsToManyAddAssociationMixin<UserAttributes, string>;
  addSubscribers?: BelongsToManyAddAssociationsMixin<UserAttributes, string>;
  setSubscribers?: BelongsToManySetAssociationsMixin<UserAttributes, string>;
  removeSubscriber?: BelongsToManyRemoveAssociationMixin<
    UserAttributes,
    string
  >;
  removeSubscribers?: BelongsToManyRemoveAssociationsMixin<
    UserAttributes,
    string
  >;
  countSubscribers?: BelongsToManyCountAssociationsMixin;
  hasSubscriber?: BelongsToManyHasAssociationMixin<UserAttributes, string>;
  hasSubscribers?: BelongsToManyHasAssociationsMixin<UserAttributes, string>;
  createSubscriber?: BelongsToManyCreateAssociationMixin<UserAttributes>;

  //Tweets
  getTweets?: BelongsToManyGetAssociationsMixin<TweetAttributes>;
  addTweet?: BelongsToManyAddAssociationMixin<TweetAttributes, string>;
  addTweets?: BelongsToManyAddAssociationsMixin<TweetAttributes, string>;
  setTweets?: BelongsToManySetAssociationsMixin<TweetAttributes, string>;
  removeTweet?: BelongsToManyRemoveAssociationMixin<TweetAttributes, string>;
  removeTweets?: BelongsToManyRemoveAssociationsMixin<TweetAttributes, string>;
  countTweets?: BelongsToManyCountAssociationsMixin;
  hasTweet?: BelongsToManyHasAssociationMixin<TweetAttributes, string>;
  hasTweets?: BelongsToManyHasAssociationsMixin<TweetAttributes, string>;
  createTweet?: BelongsToManyCreateAssociationMixin<TweetAttributes>;

  //Liked tweets
  getLikedTweets?: BelongsToManyGetAssociationsMixin<TweetAttributes>;
  addLikedTweet?: BelongsToManyAddAssociationMixin<TweetAttributes, string>;
  addLikedTweets?: BelongsToManyAddAssociationsMixin<TweetAttributes, string>;
  setLikedTweets?: BelongsToManySetAssociationsMixin<TweetAttributes, string>;
  removeLikedTweet?: BelongsToManyRemoveAssociationMixin<
    TweetAttributes,
    string
  >;
  removeLikedTweets?: BelongsToManyRemoveAssociationsMixin<
    TweetAttributes,
    string
  >;
  countLikedTweets?: BelongsToManyCountAssociationsMixin;
  hasLikedTweet?: BelongsToManyHasAssociationMixin<TweetAttributes, string>;
  hasLikedTweets?: BelongsToManyHasAssociationsMixin<TweetAttributes, string>;
  createLikedTweet?: BelongsToManyCreateAssociationMixin<TweetAttributes>;

  //Retweets
  getRetweets?: BelongsToManyGetAssociationsMixin<TweetAttributes>;
  addRetweet?: BelongsToManyAddAssociationMixin<TweetAttributes, string>;
  addRetweets?: BelongsToManyAddAssociationsMixin<TweetAttributes, string>;
  setRetweets?: BelongsToManySetAssociationsMixin<TweetAttributes, string>;
  removeRetweet?: BelongsToManyRemoveAssociationMixin<TweetAttributes, string>;
  removeRetweets?: BelongsToManyRemoveAssociationsMixin<
    TweetAttributes,
    string
  >;
  countRetweets?: BelongsToManyCountAssociationsMixin;
  hasRetweet?: BelongsToManyHasAssociationMixin<TweetAttributes, string>;
  hasRetweets?: BelongsToManyHasAssociationsMixin<TweetAttributes, string>;
  createRetweet?: BelongsToManyCreateAssociationMixin<TweetAttributes>;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export interface AuthorizedUserInterface extends UserAttributes {
  token: string;
}
