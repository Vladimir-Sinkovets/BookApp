import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ApiResponse } from "../../shared/models/api-response.type";
import { IBook } from "../models/book.model";
import { Injectable } from "@angular/core";
import { IAddBook } from "../models/add-book.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {

  }

  getPaginatedBooks(page: number, booksPerPage: number): Observable<ApiResponse<{ books: IBook[], lastPage: number }>> {
    return this.http.get<{ books: IBook[], lastPage: number }>(`${environment.apiUrl}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response,
          };
        })
      )
  }

  getBook(id: number): Observable<ApiResponse<IBook>> {
    return this.http.get<IBook>(`${environment.apiUrl}/api/book/get?id=${id}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response ?? null,
        }})
      )
  }

  addBook(data: IAddBook): Observable<ApiResponse<IBook>> {
    return this.http.post<IBook>(`${environment.apiUrl}/api/book/create`, data)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response,
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const message =
            error.status === 404 ? 'Nonexistent data' :
              error.status === 500 ? 'Server error' : 'Unknown error';

          return of({
            isSucceeded: false,
            message,
            data: undefined,
          });
        }
        ));
  }

  updateBook(data: IBook): Observable<ApiResponse<IBook>> {
    return this.http.put<IBook>(`${environment.apiUrl}/api/book/update`, data)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const message =
            error.status === 404 ? 'Nonexistent data' :
              error.status === 500 ? 'Server error' : 'Unknown error';

          return of({
            isSucceeded: false,
            message,
            data: undefined,
          })
        }));
  }
}
