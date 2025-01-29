import { HttpClient } from "@angular/common/http";
import { map, Observable, of, tap } from "rxjs";
import { ApiResponse } from "../../types/api-response.type";
import { Book } from "../types/book.type";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  private domain = 'https://localhost:7085';
  constructor(private http: HttpClient) {

  }

  getPaginatedBooks(page: number, booksPerPage: number): Observable<ApiResponse<{ books: Book[], lastPage: number }>> {
    return this.http.get<{ items: Book[], lastPage: number }>(`${this.domain}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`)
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

  getBook(id: number): Observable<ApiResponse<Book>> {
    return this.http.get<Book>(`${this.domain}/api/book/get?id=${id}`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response ?? null,
        }})
      )
  }
}
