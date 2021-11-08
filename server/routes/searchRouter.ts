import { Router } from "express";

import SearchController from "../controllers/SearchController";

const searchRouter = Router();

//Получить результат поиска
searchRouter.get("/", SearchController.getSearchData);

export { searchRouter };
