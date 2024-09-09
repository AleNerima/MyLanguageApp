import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFlashcard } from '../Interfaces/i-flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = 'https://localhost:7136/api/Flashcard';

  constructor(private http: HttpClient) {}

  getFlashcardsByDeck(deckId: number): Observable<IFlashcard[]> {
    return this.http.get<IFlashcard[]>(`${this.apiUrl}/deck/${deckId}`);
  }

  createFlashcard(flashcard: IFlashcard): Observable<IFlashcard> {
    return this.http.post<IFlashcard>(this.apiUrl, flashcard);
  }

  updateFlashcard(flashcard: IFlashcard): Observable<IFlashcard> {
    return this.http.put<IFlashcard>(`${this.apiUrl}/${flashcard.cardId}`, flashcard);
  }

  deleteFlashcard(flashcardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${flashcardId}`);
  }

  getFlashcardById(flashcardId: number): Observable<IFlashcard> {
    return this.http.get<IFlashcard>(`${this.apiUrl}/${flashcardId}`);
  }


}
