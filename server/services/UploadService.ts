import express from "express";

import { cloudinary } from "../core/cloudinary";

class UploadService {
  async upload(files: any): Promise<string[]> {
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      const result = await cloudinary.uploader
        .upload(files[i].path)
        .then((result) => result)
        .catch((err) => {
          throw new Error(err.message);
        });

      if (!result) {
        throw new Error("Загрузка изображения не удалась!");
      }

      urls.push(result.url);
    }

    return urls;
  }
}

export default new UploadService();
