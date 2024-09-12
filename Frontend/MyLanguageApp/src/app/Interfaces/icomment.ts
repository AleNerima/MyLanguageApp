export interface Icomment {
  commentId: number;  // `?` indica che potrebbe essere undefined (utile per POST)
  content: string;
  postId: number;
  userId: number;
  createdAt: string;  // Opzionale se il backend lo genera automaticamente
}
