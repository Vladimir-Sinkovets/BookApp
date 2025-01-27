import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";

interface TokenResponse {
  accessToken: string,
  refreshToken: string,
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private domain = 'http://localhost:5033';

  private accessTokenKey = "accessToken";
  private refreshTokenKey = "refreshToken";

  constructor(private http: HttpClient) { }

  register(data: { email: string, name: string, password: string })
    : Observable<HttpResponse<TokenResponse> | { status: number, message: string }> {
    return this.http.post<TokenResponse>(`${this.domain}/api/auth/register`, data, { observe: 'response' })
      .pipe(
        catchError((error) => {
          if (error.status == 400) {
            return of({ status: error.status, message: 'Wrong data' })
          }
          else if (error.status == 409) {
            return of({ status: error.status, message: 'User already exist' })
          }
          else if (error.status == 500) {
            return of({ status: error.status, message: 'Server error' })
          }
          throw error;
        }),
        tap(response => {
          if (response instanceof HttpResponse) {
            this.SetTokens(response);
          }
        })
      );
  }

  login(data: { email: string, password: string })
    : Observable<HttpResponse<TokenResponse> | { status: number, message: string }> {
    return this.http.post<TokenResponse>(`${this.domain}/api/auth/login`, data, { observe: 'response' })
      .pipe(
        catchError(error => {
          if (error.status == 404) {
            return of({ status: error.status, message: 'User does not exist' });
          }
          else if (error.status == 400) {
            return of({ status: error.status, message: 'Wrong data' });
          }
          else if (error.status == 500) {
            return of({ status: error.status, message: 'Server error' });
          }

          throw error;
        }),
        tap(response => {
          if (response instanceof HttpResponse) {
            this.SetTokens(response);
          }
        })
      );
  }

  private SetTokens(response: HttpResponse<TokenResponse>) {
    localStorage.setItem(this.accessTokenKey, response.body?.accessToken!);
    localStorage.setItem(this.refreshTokenKey, response.body?.refreshToken!);
  }
}
