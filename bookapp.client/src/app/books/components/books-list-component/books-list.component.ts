import { Component, OnInit } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import { Book } from "../../types/book.type";
import { BooksCardComponent } from "../book-card-component/book-card.component";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
  standalone: true,
  imports: [BooksCardComponent],
})
export class BooksListComponent implements OnInit {
  errorMessage: string = '';
  books: Book[] = [];
  constructor(private bookApi: BookApiService) { }

  ngOnInit(): void {
    this.bookApi.getPaginatedBooks(1, 10)
      .subscribe(response => {
        if (response.isSucceeded)
          this.books = response.data!;
        else
          this.errorMessage = response.message;
      });
  }
}
