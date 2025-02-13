import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../models/api-response.model";
import { TokenResponse } from "../../models/token-response.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private accessTokenKey = "accessToken";
  private refreshTokenKey = "refreshToken";

  constructor(private http: HttpClient) { }

  register(data: { email: string, name: string, password: string }): Observable<ApiResponse<TokenResponse>> {
    return this.http.post<ApiResponse<TokenResponse>>(`${environment.apiUrl}/api/auth/register`, data, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this.setTokens(response);
          }
        }),
        map(response => {
          return response.body!;
        })
      );
  }

  login(data: { email: string, password: string }) : Observable<ApiResponse<TokenResponse>> {
    return this.http.post<ApiResponse<TokenResponse>>(`${environment.apiUrl}/api/auth/login`, data, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this.setTokens(response);
          }
        }),
        map(response => {
          return response.body!;
        })
      );
  }

  refreshAccessToken(): Observable<ApiResponse<TokenResponse>> {
    const refreshToken = this.getRefreshToken();

    return this.http.get<ApiResponse<TokenResponse>>(`${environment.apiUrl}/api/auth/refresh?token=${refreshToken}`, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this.setTokens(response);
          }
        }),
        map(response => {
          return response.body!;
        }));
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) ?? '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) ?? '';
  }

  logOut(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);

    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.accessTokenKey) !== null;
  }

  isAccessTokenExpired(): boolean {
    const token = this.getDecodedAccessToken();

    if (token.exp == undefined)
      return true;

    const currentTime = Date.now() / 1000;

    return currentTime > Number(token.exp);
  }

  isRefreshTokenExpired(): boolean {
    const token = this.getDecodedRefreshToken();

    if (token.exp == undefined)
      return true;

    const currentTime = Date.now() / 1000;

    return currentTime > Number(token.exp);
  }

  isAdmin(): boolean {
    const decodedToken = this.getDecodedAccessToken();

    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === undefined)
      return false;

    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
  }

  private getDecodedAccessToken(): any {
    const token = this.getAccessToken();

    if (!token)
      return '';

    return jwtDecode<any>(token);
  }

  private getDecodedRefreshToken(): any {
    const token = this.getRefreshToken();

    if (!token)
      return '';

    return jwtDecode<any>(token);
  }

  private setTokens(response: HttpResponse<ApiResponse<TokenResponse>>) {
    localStorage.setItem(this.accessTokenKey, response.body?.data?.accessToken!);
    localStorage.setItem(this.refreshTokenKey, response.body?.data?.refreshToken!);

    this.isLoggedInSubject.next(true);
  }
}
