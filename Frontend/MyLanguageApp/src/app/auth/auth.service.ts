import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
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
  private userUrl = 'https://localhost:7136/api/User';

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  syncIsLoggedIn: boolean = false;

  register(newUser: Partial<IUsers>): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.registerUrl, newUser).pipe(
      catchError(this.handleError)
    );
  }

  login(authData: IAuthData): Observable<IUsers> {
    return this.http.post<IAuthResponse>(this.loginUrl, authData).pipe(
      switchMap((response: IAuthResponse) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('datiUser', JSON.stringify(response));
          this.autoLogout();

          const decodedToken = this.jwtHelper.decodeToken(token);
          const userId = decodedToken?.nameid; // Usa nameid qui

          if (userId) {
            return this.getUserData(userId);
          } else {
            console.error('No userId found in token');
            this.logout();
            return throwError(() => new Error('No userId found in token'));
          }
        } else {
          console.error('No token found in login response');
          this.logout();
          return throwError(() => new Error('No token found in login response'));
        }
      }),
      catchError(this.handleError)
    );
  }

  private getUserData(userId: string): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.userUrl}/${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((user) => this.authSubject.next(user)),
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
    if (!accessData || !accessData.token) return;

    const expDate = this.jwtHelper.getTokenExpirationDate(accessData.token);

    if (expDate) {
      const expMs = expDate.getTime() - new Date().getTime();

      if (expMs > 0) {
        setTimeout(() => {
          this.logout();
        }, expMs);
      } else {
        console.error('Token has already expired');
        this.logout();
      }
    } else {
      console.error('Token expiration date is not present in the token.');
      this.logout();
    }
  }

  restoreUser(): void {
    const accessData = this.getAccessData();
    if (accessData && accessData.token && !this.jwtHelper.isTokenExpired(accessData.token)) {
      const decodedToken = this.jwtHelper.decodeToken(accessData.token);
      const userId = decodedToken?.nameid;

      if (userId) {
        this.getUserData(userId).subscribe(user => this.authSubject.next(user));
        this.autoLogout();
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  getAccessData(): IAuthResponse | null {
    const accessDataJson = localStorage.getItem('datiUser');
    if (!accessDataJson) return null;
    return JSON.parse(accessDataJson) as IAuthResponse;
  }

  getCurrentUser(): IUsers | null {
    return this.authSubject.getValue();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAccessData()?.token;
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

  getUsersByIds(userIds: number[]): Observable<IUsers[]> {
    const idsParam = userIds.join(',');
    return this.http.get<IUsers[]>(`${this.userUrl}/byIds?ids=${idsParam}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }


}
