import express from "express";

import SearchService from "../services/SearchService";
import { Controller } from "./Controller";

class SearchController extends Controller {
  async getSearchData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const searchData = await SearchService.getSearchData(req);
      super.sendSuccess(res, searchData);
    } catch (err) {
      super.sendError(res, err);
    }
  }
}

export default new SearchController();
