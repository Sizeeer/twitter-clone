import dotenv from "dotenv";
import express from "express";

import { passport } from "./core/passport";
import { connectDB } from "./db/db";
import { authRouter } from "./routes/authRouter";
import { recommendationRouter } from "./routes/recommendationRouter";
import { searchRouter } from "./routes/searchRouter";
import { topicRouter } from "./routes/topicRouter";
import { tweetRouter } from "./routes/tweetRouter";
import { uploadRouter } from "./routes/uploadRouter";
import { userRouter } from "./routes/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/recommendations", recommendationRouter);
app.use("/tweets", tweetRouter);
app.use("/search", searchRouter);
app.use("/topics", topicRouter);
app.use("/upload", uploadRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, (): void => {
      console.log("Server started on port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
