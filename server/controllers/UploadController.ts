import UploadService from "./../services/UploadService";
import express from "express";

class UploadController {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data = await UploadService.upload(req);

      res.status(200).json({
        status: "success",
        data: data,
      });

      data.toString();
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

export default new UploadController();
