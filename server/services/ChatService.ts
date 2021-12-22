import { Op } from "sequelize";
import {
  MessageAttributes,
  MessageCreationAttributes,
} from "../../shared/types/messageTypes";
import {
  CompanionChatAttributes,
  UserChatAttributes,
} from "../../shared/types/userChatTypes";
import { UserAttributes } from "../../shared/types/userTypes";
import { db } from "../db/db";
import { Service } from "./Service";

const UsersChats = db.UsersChats;
const CompanionsChats = db.CompanionsChats;
const Chats = db.Chats;
const Users = db.Users;

class ChatService extends Service {
  async getChats(myData: UserAttributes) {
    const usersChatsIds = await UsersChats.findAll({
      where: {
        userId: myData.userId,
      },
    })
      .then((res) => JSON.parse(JSON.stringify(res)))
      .then((data: UserChatAttributes[]) => {
        const ids = data.map((el) => el.chatroom_id);
        return ids;
      });

    let users: { user: UserAttributes; lastMessageDate: Date }[] = [];
    for await (const id of usersChatsIds) {
      const currentCompanionChat = await CompanionsChats.findOne({
        where: {
          chatroom_id: id,
        },
        include: {
          model: Users,
          as: "user",
        },
      });

      const currentChat = await currentCompanionChat.getChat();

      const messages = await currentChat.getMessages({
        limit: 1,
        order: ["createdAt"],
      });

      const user = JSON.parse(JSON.stringify(currentCompanionChat))
        .user as UserAttributes;

      users.push({ user, lastMessageDate: messages?.[0]?.updatedAt || null });
    }

    return users;
  }
  async getMessages(
    userId: string,
    companionId: string,
    limit: number,
    page: number
  ) {
    const userChats = await UsersChats.findAll({
      where: {
        userId,
      },
    });

    if (userChats.length === 0) {
      throw new Error("У вас нет чата с данным пользователем");
    }

    //Собрать все chatroom_id  и пробежаться по ним
    //И найти чат по id

    let chatRoomIds = userChats.map((userChat) => userChat.chatroom_id);

    const currentCompanionChat = await CompanionsChats.findOne({
      where: {
        chatroom_id: {
          [Op.in]: chatRoomIds,
        },
        userId: companionId,
      },
    });

    const currentChat = await currentCompanionChat.getChat();

    const messages = await currentChat.getMessages({
      offset: (page - 1) * limit,
      limit,
      order: ["createdAt"],
    });

    return messages;
  }

  async getAllMessagesCount(userId: string) {
    const userChat = await UsersChats.findOne({
      where: {
        userId,
      },
    });

    if (!userChat) {
      throw new Error("У вас нет чата с данным пользователем");
    }

    const currentChat = await userChat.getChat();

    const messages = await currentChat.getMessages();

    return messages.length;
  }

  async addMessage(userId: string, text: string) {
    const userChat = await UsersChats.findOne({
      where: {
        userId,
      },
    });

    if (!userChat) {
      throw new Error("У вас нет чата с данным пользователем");
    }

    const currentChat = await userChat.getChat();

    const newMessage: MessageCreationAttributes = {
      sender_id: userId,
      chatroom_id: currentChat.chatroom_id,
      text,
    };

    const addedMessage = await currentChat
      .createMessage(newMessage)
      .then((res) => JSON.parse(JSON.stringify(res)));

    return addedMessage;
  }

  async create(myData: UserAttributes, companionId: string) {
    const newChat = await Chats.create({});

    await UsersChats.create({
      chatroom_id: newChat.chatroom_id,
      userId: myData.userId,
    });
    await CompanionsChats.create({
      chatroom_id: newChat.chatroom_id,
      userId: companionId,
    });
  }
}
export default new ChatService();
