export interface IUsers {
  userId: number;
  username: string;
  email: string;
  nativeLanguage: string;
  targetLanguage: string;
  createdAt: Date;
  imageUrl?: string;
  imageData?: string;
}
