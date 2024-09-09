export interface IFlashcard {

  cardId?: number;
  term: string;
  definition: string;
  difficultyLevel: number;
  deckId: number;
  createdAt?: Date;
  nextReviewDate?: Date;

}
