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

export interface UserAttributesUI
  extends Omit<UserAttributes, "password" | "confirmHash"> {}

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
}

export interface AuthorizedUserInterface extends UserAttributes {
  token: string;
}
