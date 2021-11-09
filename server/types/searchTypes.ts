import { TopicAttributes } from "./topicTypes";
import { UserAttributes } from "./userTypes";

export interface SearchData {
  users: UserAttributes[];
  topics: TopicAttributes[];
}
