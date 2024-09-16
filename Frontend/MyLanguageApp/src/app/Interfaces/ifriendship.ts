export interface IFriendship {
  friendshipId: number;
  userId1: number;
  userId2: number;
  status: number; // Stato come numero
  startedAt: Date;
  requesterId: number;
}
