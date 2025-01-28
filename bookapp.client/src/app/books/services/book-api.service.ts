import { HttpClient } from "@angular/common/http";
import { from, Observable, of } from "rxjs";
import { ApiResponse } from "../../types/api-response.type";
import { Book } from "../types/book.type";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {

  }

  getPaginatedBooks(page: number, booksPerPage: number): Observable<ApiResponse<Book[]>> {
    var data: Book[] = [];

    for (var i = 0; i < 20; i++) {
      data.push(
        {
          id: i,
          title: `test_${i}`,
          author: 'test',
          description: 'test',
          fragment: 'test',
          tags: ['test_0', 'test_1', 'test_2',],
        }
      );
    }

    return of({
      isSucceeded: true,
      message: '',
      data: data,
    })
  }
}
