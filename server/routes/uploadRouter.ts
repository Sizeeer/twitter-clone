import { Router } from "express";
import multer from "multer";

import UploadController from "../controllers/UploadController";

const uploadRouter = Router();

const upload = multer({ dest: "../uploads/" });

uploadRouter.post("/", upload.array("avatar", 2), UploadController.upload);

export { uploadRouter };
