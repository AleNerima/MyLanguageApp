export interface Icomment {
  commentId: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: Date; // Opzionale se il backend lo genera automaticamente
}
