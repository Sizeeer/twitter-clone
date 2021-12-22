import { DataTypes, ModelCtor, Sequelize } from "sequelize";
import { UserChatInstance } from "../../../shared/types/userChatTypes";

export default (sequelize: Sequelize): ModelCtor<UserChatInstance> => {
  const UserChatModel = sequelize.define<UserChatInstance>("UserChat", {
    chatroom_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  });

  return UserChatModel;
};
