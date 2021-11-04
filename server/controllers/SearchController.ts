import express from "express";

import SearchService from "../services/SearchService";

class SearchController {
  async getSearchData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const searchData = await SearchService.getSearchData(req);
      res.status(200).json({
        status: "success",
        data: searchData,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

export default new SearchController();
