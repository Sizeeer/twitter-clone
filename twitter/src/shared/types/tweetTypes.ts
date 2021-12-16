import { TopicAttributes } from "./topicTypes";
import { UserAttributes, UserAttributesUI } from "./userTypes";

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
  retweetedUser?: UserAttributesUI;
  user: UserAttributesUI;
  likes: number;
  retweets: number;
}
