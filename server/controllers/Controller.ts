import express from "express";

import { HttpError } from "./../errors/HttpError";
import { QueryError } from "./../errors/QueryError";

interface IController {
  sendError: (res: express.Response, err: Error) => void;
  sendSuccess: (res: express.Response, data?: any) => void;
}

class Controller implements IController {
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

  sendSuccess(res: express.Response, data?: any): void {
    res.status(200).json({
      status: "success",
      data,
    });
  }
}

export { Controller };
