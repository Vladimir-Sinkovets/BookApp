import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AddBook } from "../../models/add-book.model";
import { ApiResponse } from "../../models/api-response.model";
import { Book } from "../../models/book.model";

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {

  }

  getPaginatedBooks(page: number, booksPerPage: number): Observable<ApiResponse<{ books: Book[], lastPage: number }>> {
    return this.http.get<{ items: Book[], lastPage: number }>(`${environment.apiUrl}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: {
              books: response.items,
              lastPage: response.lastPage,
            }
          };
        })
      )
  }

  getBook(id: number): Observable<ApiResponse<Book>> {
    return this.http.get<Book>(`${environment.apiUrl}/api/book/get?id=${id}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response ?? null,
        }})
      )
  }

  addBook(data: AddBook): Observable<ApiResponse<Book>> {
    return this.http.post<Book>(`${environment.apiUrl}/api/book/create`, data)
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

  updateBook(data: Book): Observable<ApiResponse<Book>> {
    return this.http.put<Book>(`${environment.apiUrl}/api/book/update`, data)
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
