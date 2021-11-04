import { DataTypes, ModelCtor, Sequelize } from "sequelize";

import { UserInstance } from "../../types/userTypes";

export default (sequelize: Sequelize): ModelCtor<UserInstance> => {
  const UserModel = sequelize.define<UserInstance>("User", {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    confirmHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    location: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    backgroundImage: {
      type: DataTypes.TEXT,
    },
  });

  return UserModel;
};
