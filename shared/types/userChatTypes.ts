import {
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  Model,
  Optional,
} from "../../server/types";
import { ChatAttributes } from "./chatTypes";
import { UserAttributes } from "./userTypes";

interface CurrentChatAttributes {
  chatroom_id: string;
  userId: string;

  getChat?: HasOneGetAssociationMixin<ChatAttributes>;
  createChat?: HasOneCreateAssociationMixin<ChatAttributes>;
  getUser?: HasOneGetAssociationMixin<UserAttributes>;
  createUser?: HasOneCreateAssociationMixin<UserAttributes>;
}

export interface UserChatAttributes extends CurrentChatAttributes {}

interface UserChatCreationAttributes
  extends Optional<UserChatAttributes, "chatroom_id" | "userId"> {}

export interface UserChatInstance
  extends Model<UserChatAttributes, UserChatCreationAttributes>,
    UserChatAttributes {}

export interface CompanionChatAttributes extends CurrentChatAttributes {}

interface CompanionChatCreationAttributes
  extends Optional<UserChatAttributes, "chatroom_id" | "userId"> {}

export interface CompanionChatInstance
  extends Model<CompanionChatAttributes, CompanionChatCreationAttributes>,
    CompanionChatAttributes {}
