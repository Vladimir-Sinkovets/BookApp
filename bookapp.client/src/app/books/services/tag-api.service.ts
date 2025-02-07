import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ApiResponse } from "../../shared/models/api-response.type";
import { ITag } from "../models/tag.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TagApiService {
  constructor(private http: HttpClient) { }

  getTags(): Observable<ApiResponse<string[]>> {
    return this.http.get<{ name: string, id: number }[]>(`${environment.apiUrl}/api/tag/all`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response.map(t => t.name),
          }
        }
      ));
  }

  addTag(tagName: string): Observable<ApiResponse<ITag>> {
    return this.http.post<ITag>(`${environment.apiUrl}/api/tag/create`, { name: tagName })
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'Success',
            data: response,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          const message =
            error.status === 409 ? 'Already exist' :
              error.status === 500 ? 'Server error' : 'Unknown error';

          return of({
            isSucceeded: false,
            message: message,
            data: undefined,
          });
        })
      );
  }
  deleteTag(tagName: string): Observable<ApiResponse<undefined>> {
    return this.http.delete(`${environment.apiUrl}/api/tag/delete?name=${tagName}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'Success',
            data: undefined,
          }
        })
      );
  }
}
