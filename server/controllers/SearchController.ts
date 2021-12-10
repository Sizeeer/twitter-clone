import express from "express";

import SearchService from "../services/SearchService";
import { Controller } from "./Controller";

class SearchController extends Controller {
  async getSearchData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const searchString = req.query.name as string;
      const limit = Number(req.query.limit)
        ? Number(req.query.limit)
        : super.defaultLimit;
      const searchData = await SearchService.getSearchData(searchString, limit);
      super.sendSuccess(res, searchData);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new SearchController();
