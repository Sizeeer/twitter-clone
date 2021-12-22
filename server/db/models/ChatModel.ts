import { DataTypes, ModelCtor, Sequelize } from "sequelize";
import { ChatInstance } from "../../../shared/types/chatTypes";

export default (sequelize: Sequelize): ModelCtor<ChatInstance> => {
  const ChatModel = sequelize.define<ChatInstance>("Chat", {
    chatroom_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
  });

  return ChatModel;
};
