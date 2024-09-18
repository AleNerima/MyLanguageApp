import { IChatMessage } from "./ichat-message";

export interface Ichat {

  chatId: number;
  userId1: number;
  userId2: number;
  messages?: IChatMessage[];
}
