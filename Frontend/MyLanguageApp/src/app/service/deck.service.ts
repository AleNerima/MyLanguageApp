import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IDeck } from '../Interfaces/i-deck';
import { AuthService } from '../auth/auth.service';  // Assicurati di importare il servizio di autenticazione

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'https://localhost:7136/api/Deck';  // Sostituisci con l'URL del tuo backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Recupera tutti i deck di un utente
  getDecksByUser(userId: number): Observable<IDeck[]> {
    return this.http.get<IDeck[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Crea un nuovo deck
  createDeck(deck: IDeck): Observable<IDeck> {
    return this.http.post<IDeck>(this.apiUrl, deck, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Elimina un deck
  deleteDeck(deckId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${deckId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiorna un deck
  updateDeck(deck: IDeck): Observable<IDeck> {
    return this.http.put<IDeck>(this.apiUrl, deck, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Recupera un deck specifico tramite il suo ID
  getDeckById(deckId: number): Observable<IDeck> {
    return this.http.get<IDeck>(`${this.apiUrl}/${deckId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiungi intestazioni di autorizzazione
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessData()?.token;
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Gestisce gli errori delle richieste HTTP
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error && error.error.message ? `Error: ${error.error.message}` : `Error: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
