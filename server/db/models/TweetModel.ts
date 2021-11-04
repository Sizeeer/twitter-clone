import { TweetInstance } from "./../../types/tweetTypes";
import { DataTypes, ModelCtor, Sequelize } from "sequelize";
export default (sequelize: Sequelize): ModelCtor<TweetInstance> => {
  const TweetModel = sequelize.define<TweetInstance>("Tweet", {
    tweetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    images: DataTypes.ARRAY(DataTypes.TEXT),
    text: DataTypes.TEXT,
  });

  return TweetModel;
};
