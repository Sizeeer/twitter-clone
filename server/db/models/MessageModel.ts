import { DataTypes, ModelCtor, Sequelize } from "sequelize";
import { MessageInstance } from "../../../shared/types/messageTypes";
export default (sequelize: Sequelize): ModelCtor<MessageInstance> => {
  const MessageModel = sequelize.define<MessageInstance>("Message", {
    message_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    sender_id: { type: DataTypes.UUID, allowNull: false },
    text: DataTypes.TEXT,
    chatroom_id: { type: DataTypes.UUID, allowNull: false },
  });

  return MessageModel;
};
