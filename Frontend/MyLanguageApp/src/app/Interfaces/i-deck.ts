import { IFlashcard } from "./i-flashcard";

export interface IDeck {

  deckId?: number;  // Facoltativo, perché non esiste prima della creazione
  name: string;
  description: string;
  userId: number;
  createdAt?: Date;
  flashcards?: {
    $values: IFlashcard[];}

}
