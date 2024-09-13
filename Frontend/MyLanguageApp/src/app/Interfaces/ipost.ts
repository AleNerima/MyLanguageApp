export interface Ipost {

  postId: number;
  language: string;
  content: string;
  author: string;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;

}
