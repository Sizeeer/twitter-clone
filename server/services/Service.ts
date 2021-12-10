import { db } from "../db/db";

const Users = db.Users;

class Service {
  async getCurrentUser(userId: string) {
    return Users.findOne({
      where: {
        userId,
      },
    });
  }
}

export { Service };
