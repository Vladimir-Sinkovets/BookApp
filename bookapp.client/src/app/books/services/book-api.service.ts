import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";
import { ApiResponse } from "../../types/api-response.type";
import { IBook } from "../types/book.interface";
import { Injectable } from "@angular/core";
import { IAddBook } from "../types/add-book.interface";

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  private domain = 'https://localhost:7085';
  constructor(private http: HttpClient) {

  }

  getPaginatedBooks(page: number, booksPerPage: number): Observable<ApiResponse<{ books: IBook[], lastPage: number }>> {
    return this.http.get<{ items: IBook[], lastPage: number }>(`${this.domain}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: {
              books: response.items,
              lastPage: response.lastPage,
            },
          };
        })
      )
  }

  getBook(id: number): Observable<ApiResponse<IBook>> {
    return this.http.get<IBook>(`${this.domain}/api/book/get?id=${id}`)
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
    return this.http.post<IBook>(`${this.domain}/api/book/create`, data)
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
    return this.http.put<IBook>(`${this.domain}/api/book/update`, data)
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
