import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { IUsers } from '../Interfaces/iusers';
import { IAuthResponse } from '../Interfaces/iauth-response';
import { IAuthData } from '../Interfaces/iauth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authSubject = new BehaviorSubject<IUsers | null>(null);

  public user$ = this.authSubject.asObservable();
  public isLoggedIn$ = this.user$.pipe(
    map((user) => !!user),
    tap((user) => this.syncIsLoggedIn = user)
  );

  private loginUrl = 'https://localhost:7136/api/Auth/login';
  private registerUrl = 'https://localhost:7136/api/Auth/register';

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  syncIsLoggedIn: boolean = false;

  register(newUser: Partial<IUsers>): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.registerUrl, newUser).pipe(
      catchError(this.handleError)
    );
  }

  login(authData: IAuthData): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.loginUrl, authData).pipe(
      tap((data) => {
        this.authSubject.next(data.user);
        localStorage.setItem('datiUser', JSON.stringify(data));
        this.autoLogout();
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('datiUser');
    this.router.navigate(['/auth/login']);
  }

  autoLogout(): void {
    const accessData = this.getAccessData();
    if (!accessData || !accessData.accessToken) return;

    const expDate = this.jwtHelper.getTokenExpirationDate(accessData.accessToken);

    if (!expDate) {
      console.error('Token expiration date is not present in the token.');
      this.logout(); // Se la data di scadenza non è presente, esegui il logout immediato
      return;
    }

    const expMs = expDate.getTime() - new Date().getTime();

    // Assicurati che la differenza di tempo sia positiva
    if (expMs > 0) {
      setTimeout(() => {
        this.logout();
      }, expMs);
    } else {
      console.error('Token has already expired');
      this.logout(); // Logout immediato se il token è scaduto
    }
  }

  restoreUser(): void {
    const accessData = this.getAccessData();
    if (!accessData || !accessData.accessToken) return;

    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
      this.logout(); // Logout se il token è scaduto
      return;
    }
    this.authSubject.next(accessData.user);
    this.autoLogout();
  }

  getAccessData(): IAuthResponse | null {
    const accessDataJson = localStorage.getItem('datiUser');
    if (!accessDataJson) return null;
    return JSON.parse(accessDataJson) as IAuthResponse;
  }

  getCurrentUser(): IUsers | null {
    return this.authSubject.getValue();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
