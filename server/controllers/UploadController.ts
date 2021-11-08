import express from "express";

import UploadService from "./../services/UploadService";
import { Controller } from "./Controller";

class UploadController extends Controller {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data = await UploadService.upload(req);
      super.sendSuccess(res, data);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new UploadController();
