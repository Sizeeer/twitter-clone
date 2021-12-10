import { TweetAttributes } from "./tweetTypes";

export interface TopicsTweets extends TopicAttributes {
  tweets: TweetAttributes[];
}

export interface TopicAttributes {
  topicId?: string;
  title: string;
  count?: number;
}
