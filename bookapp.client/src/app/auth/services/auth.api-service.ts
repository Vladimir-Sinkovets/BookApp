import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { ApiResponse } from "../../shared/models/api-response.type";
import { jwtDecode } from 'jwt-decode';

export interface TokenResponse {
  accessToken: string,
  refreshToken: string,
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private domain = 'https://localhost:7085';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private accessTokenKey = "accessToken";
  private refreshTokenKey = "refreshToken";

  constructor(private http: HttpClient) { }

  register(data: { email: string, name: string, password: string }): Observable<ApiResponse<TokenResponse>> {
    return this.http.post<TokenResponse>(`${this.domain}/api/auth/register`, data, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this.setTokens(response);
          }
        }),
        catchError((error) => {
          if (error.status == 400) {
            return of({ isSucceeded: false, message: 'Wrong data', data: undefined });
          } else if (error.status == 409) {
            return of({ isSucceeded: false, message: 'User already exist', data: undefined });
          } else if (error.status == 500) {
            return of({ isSucceeded: false, message: 'Server error', data: undefined });
          }
          return of({ isSucceeded: false, message: 'Unknown error', data: undefined });
        }),
        map(response => {
          if (response instanceof HttpResponse) {
            return { isSucceeded: true, message: 'Success', data: response.body ?? undefined };
          } else {
            return response;
          }
        })
      );
  }

  login(data: { email: string, password: string }) : Observable<ApiResponse<TokenResponse>> {
    return this.http.post<TokenResponse>(`${this.domain}/api/auth/login`, data, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this.setTokens(response);
          }
        }),
        catchError((error) => {
          if (error.status == 400) {
            return of({ isSucceeded: false, message: 'Wrong data', data: undefined });
          } else if (error.status == 404) {
            return of({ isSucceeded: false, message: 'User does not exist', data: undefined });
          } else if (error.status == 500) {
            return of({ isSucceeded: false, message: 'Server error', data: undefined });
          }
          return of({ isSucceeded: false, message: 'Unknown error', data: undefined });
        }),
        map(response => {
          if (response instanceof HttpResponse) {
            return { isSucceeded: true, message: 'Success', data: response.body ?? undefined };
          } else {
            return response;
          }
        })
      );
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) ?? '';
  }

  logOut(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);

    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.accessTokenKey) !== null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  private getUserRole(): string {
    const token = this.getAccessToken();

    if (!token)
      return '';

    const decodedToken = jwtDecode<any>(token);

    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === undefined)
      return '';

    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  private setTokens(response: HttpResponse<TokenResponse>) {
    localStorage.setItem(this.accessTokenKey, response.body?.accessToken!);
    localStorage.setItem(this.refreshTokenKey, response.body?.refreshToken!);

    this.isLoggedInSubject.next(true);
  }
}
