import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
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
    return this.http.get<ApiResponse<{ books: Book[], lastPage: number }>>(`${environment.apiUrl}/api/book/all?page=${page}&itemsPerPage=${booksPerPage}`)
      .pipe(
        map(response => {
          return response;
        })
      )
  }

  getBook(id: number): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(`${environment.apiUrl}/api/book/get?id=${id}`)
      .pipe(
        map(response => {
          return response
        })
      );
  }

  addBook(data: AddBook): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>(`${environment.apiUrl}/api/book/create`, data)
      .pipe(
        map(response => {
          return response
        }));
  }

  updateBook(data: Book): Observable<ApiResponse<Book>> {
    return this.http.put<ApiResponse<Book>>(`${environment.apiUrl}/api/book/update`, data)
      .pipe(
        map(response => {
          return response
        }));
  }
}
