import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IFriendship } from '../Interfaces/ifriendship';
import { AuthService } from '../auth/auth.service';


// Interfaccia per la risposta dell'API che contiene l'array di amicizie
interface ApiResponse<T> {
  $id: string;
  $values: T[];
}

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  private apiUrl = 'https://localhost:7136/api/Friendship';  // Cambia l'URL se necessario

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Ottieni tutte le amicizie di un utente
  getFriendships(userId: number): Observable<IFriendship[]> {
    return this.http.get<ApiResponse<IFriendship>>(`${this.apiUrl}/byUser/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.$values), // Estrai l'array dal campo $values
      catchError(this.handleError)
    );
  }

  // Ottieni le richieste di amicizia pendenti dell'utente
  getPendingFriendships(userId: number): Observable<IFriendship[]> {
    return this.http.get<ApiResponse<IFriendship>>(`${this.apiUrl}/pending/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.$values), // Estrai l'array dal campo $values
      catchError(this.handleError)
    );
  }

  // Invia una richiesta di amicizia
  sendFriendRequest(request: { userId1: number; userId2: number }): Observable<IFriendship> {
    return this.http.post<IFriendship>(this.apiUrl, request, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }


  acceptFriendRequest(friendshipId: number): Observable<IFriendship> {
    const requestBody = { status: 1 };  // Cambia a 1 per accettare
    console.log(`Sending accept request with ID: ${friendshipId}`, requestBody);
    return this.http.put<IFriendship>(`${this.apiUrl}/${friendshipId}/status`, requestBody, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  rejectFriendRequest(friendshipId: number): Observable<IFriendship> {
    const requestBody = { status: 2 };  // Cambia a 2 per rifiutare
    console.log(`Sending reject request with ID: ${friendshipId}`, requestBody);
    return this.http.put<IFriendship>(`${this.apiUrl}/${friendshipId}/status`, requestBody, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }


 // Controlla se una richiesta di amicizia esiste
  checkFriendRequest(userId1: number, userId2: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/checkRequest/${userId1}/${userId2}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessData()?.token;
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
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
