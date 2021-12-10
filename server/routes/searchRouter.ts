import { Router } from "express";

import SearchController from "../controllers/SearchController";
import { passport } from "../core/passport";

const searchRouter = Router();

//Получить результат поиска
searchRouter.get(
  "/",
  passport.authenticate("jwt"),
  SearchController.getSearchData
);

export { searchRouter };
