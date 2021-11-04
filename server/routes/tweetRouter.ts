import { Router } from "express";

import TweetController from "../controllers/TweetController";
import { passport } from "../core/passport";

const tweetRouter = Router();

//Лайк. Готово
tweetRouter.post(
  "/like/:id",
  passport.authenticate("jwt"),
  TweetController.like
);

//Отмена лайка. Готово
tweetRouter.post(
  "/unlike/:id",
  passport.authenticate("jwt"),
  TweetController.unlike
);

//Создание твита. Готово
tweetRouter.post(
  "/create",
  passport.authenticate("jwt"),
  TweetController.create
);
//Ретвит. Готово
tweetRouter.post(
  "/retweet/:id",
  passport.authenticate("jwt"),
  TweetController.retweet
);

//Удаление твита. Готово
tweetRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt"),
  TweetController.delete
);

//Получение понравившихся твитов. Готово
tweetRouter.get(
  "/liked",
  passport.authenticate("jwt"),
  TweetController.getLikedTweets
);

//Получение моих твитов и ретвитов. Готово
tweetRouter.get(
  "/personal",
  passport.authenticate("jwt"),
  TweetController.getPersonalTweets
);

//Получение твитов людей, на которых я подпсиан. Готово
tweetRouter.get(
  "/",
  passport.authenticate("jwt"),
  TweetController.getSubscriptionsTweets
);

export { tweetRouter };
