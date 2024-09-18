export interface IChatMessage {
  messageId: number;
  chatId: number;
  senderId: number;
  receiverId: number;
  messageText: string;
  createdAt: Date;
}
