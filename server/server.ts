import dotenv from "dotenv";
import express from "express";

import { passport } from "./core/passport";
import { connectDB, db } from "./db/db";
import { authRouter } from "./routes/authRouter";
import { recommendationRouter } from "./routes/recommendationRouter";
import { searchRouter } from "./routes/searchRouter";
import { topicRouter } from "./routes/topicRouter";
import { tweetRouter } from "./routes/tweetRouter";
import { uploadRouter } from "./routes/uploadRouter";
import { userRouter } from "./routes/userRouter";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Event } from "./chatEvents";
import ChatService from "./services/ChatService";
import { chatRouter } from "./routes/chatRouter";

dotenv.config();
const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.static("static"));
app.use(passport.initialize());
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/recommendations", recommendationRouter);
app.use("/tweets", tweetRouter);
app.use("/search", searchRouter);
app.use("/topics", topicRouter);
app.use("/upload", uploadRouter);
app.use("/chats", chatRouter);

const start = async () => {
  try {
    await connectDB();

    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", function (socket) {
      console.log("a user connected", socket.id);

      socket.on(
        Event.ADD_MESSAGE_FROM_CLIENT,
        async ({ userId, text }: { userId: string; text: string }) => {
          const addedMessage = await ChatService.addMessage(userId, text);

          io.emit(Event.ADD_MESSAGE_FROM_SERVER, { message: addedMessage });
        }
      );

      socket.on("disconnect", async function () {});
    });
    httpServer.listen(process.env.PORT, () => {
      console.log("Server started on port: " + process.env.PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
