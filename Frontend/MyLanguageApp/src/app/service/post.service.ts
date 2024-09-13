import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Ipost } from '../Interfaces/ipost';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'https://localhost:7136/api/Post';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPosts(filter?: { startDate?: Date; endDate?: Date; language?: string }): Observable<Ipost[]> {
    let params = new HttpParams();
    if (filter?.startDate) params = params.set('startDate', filter.startDate.toISOString());
    if (filter?.endDate) params = params.set('endDate', filter.endDate.toISOString());
    if (filter?.language) params = params.set('language', filter.language);

    return this.http.get<any>(this.postsUrl, { params }).pipe(
      map(response => {
        if (response && response.$values && Array.isArray(response.$values)) {
          return response.$values as Ipost[];
        }
        console.error('Unexpected response format:', response);
        return [];
      }),
      catchError(this.handleError)
    );
  }


  createPost(post: Ipost): Observable<Ipost> {
    return this.http.post<Ipost>(this.postsUrl, post, { headers: this.getAuthHeaders() }).pipe(
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

  deletePost(postId: number): Observable<void> {
    const url = `${this.postsUrl}/${postId}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}
