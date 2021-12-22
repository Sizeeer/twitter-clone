import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { CompanionChatInstance } from "./../../../shared/types/userChatTypes";

export default (sequelize: Sequelize): ModelCtor<CompanionChatInstance> => {
  const CompanionChatModel = sequelize.define<CompanionChatInstance>(
    "CompanionChat",
    {
      chatroom_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    }
  );

  return CompanionChatModel;
};
