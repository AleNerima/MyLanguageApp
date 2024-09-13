import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Icomment } from '../Interfaces/icomment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsUrl = 'https://localhost:7136/api/Comment';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCommentsByPostId(postId: number): Observable<Icomment[]> {
    return this.http.get<any>(`${this.commentsUrl}/post/${postId}`).pipe(
      map(response => response.$values)  // Estrae l'array di commenti
    );
  }

  createComment(comment: Icomment): Observable<Icomment> {
    return this.http.post<Icomment>(this.commentsUrl, comment, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.commentsUrl}/${commentId}`, { headers: this.getAuthHeaders() }).pipe(
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
