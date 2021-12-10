import { DataTypes, ModelCtor, Sequelize } from "sequelize";
import { TopicInstance } from "../../../shared/types/topicTypes";

//Сделать чтобы минимум было 1
export default (sequelize: Sequelize): ModelCtor<TopicInstance> => {
  const TopicModel = sequelize.define<TopicInstance>("Topic", {
    topicId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return TopicModel;
};
