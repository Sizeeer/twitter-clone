import express from "express";

import ChatService from "../services/ChatService";
import { Controller } from "./Controller";

class ChatController extends Controller {
  async getMessages(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);

      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const page = Number(req.query.page) ? Number(req.query.page) : 0;
      const companionId = req.query.companionId as string;
      const allMessagesCount = await ChatService.getAllMessagesCount(
        myData.userId
      );
      const messages = await ChatService.getMessages(
        myData.userId,
        companionId,
        limit,
        page
      );
      super.sendSuccess(res, {
        data: [...messages],
        allCount: allMessagesCount,
      });
    } catch (err) {
      super.sendError(res, err);
    }
  }

  async getChats(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const chatsData = await ChatService.getChats(myData);
      super.sendSuccess(res, chatsData);
    } catch (err) {
      super.sendError(res, err);
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const myData = super.userDataFromRequest(req);
      const companionId = req.params.companionId;
      await ChatService.create(myData, companionId);
      super.sendSuccess(res);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new ChatController();
