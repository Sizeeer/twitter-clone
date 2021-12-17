import express from "express";
import { Sequelize } from "sequelize";

import { UserAttributes } from "../../shared/types/userTypes";
import { db } from "../db/db";
import { HttpError } from "./../errors/HttpError";
import { QueryError } from "./../errors/QueryError";

const Users = db.Users;

class Controller {
  defaultLimit = 10;

  sendError(res: express.Response, err: Error): void {
    if (err instanceof HttpError || err instanceof QueryError) {
      res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async getCurrentUser(userId: string) {
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
    })
      .then((res) => JSON.parse(JSON.stringify(res)))
      .then((data) => {
        data.subscribersCount = +data.subscribersCount;
        data.subscriptions = +data.subscriptions;
        return data;
      });
  }

  userDataFromRequest(req: express.Request) {
    return req.user as UserAttributes;
  }

  sendSuccess(res: express.Response, data?: any): void {
    res.status(200).json({
      status: "success",
      data,
    });
  }
}

export { Controller };
