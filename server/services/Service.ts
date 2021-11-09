import express from "express";

import { db } from "../db/db";
import { UserAttributes } from "./../types/userTypes";

interface IService {
  defaultLimit: number;
  userDataFromRequest: (req: express.Request) => UserAttributes;
}

const Users = db.Users;

class Service implements IService {
  defaultLimit = 3;

  async getCurrentUser(userId: string) {
    return Users.findOne({
      where: {
        userId,
      },
    });
  }

  userDataFromRequest(req: express.Request) {
    return req.user as UserAttributes;
  }
}

export { Service };
