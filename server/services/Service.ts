import { Sequelize } from "sequelize";
import { UserInstance } from "../../shared/types/userTypes";
import { db } from "../db/db";

const Users = db.Users;

class Service {
  async getCurrentUser(userId: string): Promise<UserInstance> {
    return Users.findOne({
      where: {
        userId,
      },
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("subscribers.userId")),
            "subscribersCount",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("subscriptions.userId")),
            "subscriptionsCount",
          ],
        ],
      },
      include: [
        {
          model: Users,
          as: "subscribers",
          attributes: [],
        },
        {
          model: Users,
          as: "subscriptions",
          attributes: [],
        },
      ],
      //@ts-ignore
      includeIgnoreAttributes: false,
      group: ["User.userId"],
    });
  }
}

export { Service };
