export interface MessageAttributes {
  message_id: string;
  sender_id: string;
  text: string;
  chatroom_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
