// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'; // Assumi che esista un AuthService
import { IUsers } from '../Interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://localhost:7136/api/User'; // Modifica con il tuo endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Nuovo metodo per ottenere tutti gli utenti
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessData(); // Assumi che il token venga ottenuto in questo modo
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getUsersByIds(userIds: number[]): Observable<IUsers[]> {
    const requests = userIds.map(userId => this.getUser(userId));
    return forkJoin(requests).pipe(
      catchError(this.handleError)
    );
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
