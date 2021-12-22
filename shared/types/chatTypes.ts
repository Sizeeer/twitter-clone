import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
} from "../../server/types";
import { MessageAttributes, MessageCreationAttributes } from "./messageTypes";

export interface ChatAttributes {
  chatroom_id: string;
  getMessages?: HasManyGetAssociationsMixin<MessageAttributes>;
  countMessages?: HasManyCountAssociationsMixin;
  removeMessage?: HasManyRemoveAssociationMixin<MessageAttributes, string>;
  createMessage?: HasManyCreateAssociationMixin<MessageAttributes>;
}

interface ChatCreationAttributes
  extends Optional<ChatAttributes, "chatroom_id"> {}

export interface ChatInstance
  extends Model<ChatAttributes, ChatCreationAttributes>,
    ChatAttributes {}
