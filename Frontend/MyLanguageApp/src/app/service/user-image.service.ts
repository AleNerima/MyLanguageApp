import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface IUserImage {
  userId: number;
  base64Image: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserImageService {
  private apiUrl = 'https://localhost:7136/api/UserImages';

  constructor(private http: HttpClient) {}

  uploadProfileImage(userId: number, base64Image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload/${userId}`, { base64Image }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        console.error('Errore durante il caricamento dell\'immagine:', error);
        return throwError('Errore durante il caricamento dell\'immagine');
      })
    );
  }


  updateProfileImage(userId: number, newBase64Image: string): Observable<any> {
    const userImage: IUserImage = { userId, base64Image: newBase64Image };
    return this.http.put(`${this.apiUrl}/update/${userId}`, userImage.base64Image);
  }

  getProfileImage(userId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/profile/${userId}`).pipe(
      catchError(error => {
        console.error('Errore nel recupero dell\'immagine:', error);
        return throwError('Errore nel recupero dell\'immagine');
      })
    );
}
}
