import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ApiResponse } from "../../types/api-response.type";

export interface TokenResponse {
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

  register(data: { email: string, name: string, password: string }): Observable<ApiResponse<TokenResponse>> {
    return this.http.post<TokenResponse>(`${this.domain}/api/auth/register`, data, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            this.SetTokens(response);
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
            this.SetTokens(response);
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

  private SetTokens(response: HttpResponse<TokenResponse>) {
    localStorage.setItem(this.accessTokenKey, response.body?.accessToken!);
    localStorage.setItem(this.refreshTokenKey, response.body?.refreshToken!);
  }
}
