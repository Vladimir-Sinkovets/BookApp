import { Component, Input, OnInit } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import { Book } from "../../types/book.type";
import { BooksCardComponent } from "../book-card-component/book-card.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
  standalone: true,
  imports: [BooksCardComponent],
})
export class BooksListComponent implements OnInit {
  @Input() page: number = 1;
  @Input() booksPerPage: number = 20;

  errorMessage: string = '';
  books: Book[] = [];
  constructor(private bookApi: BookApiService, private router: Router) { }

  ngOnInit(): void {
    this.bookApi.getPaginatedBooks(this.page, this.booksPerPage)
      .subscribe(response => {
        if (response.isSucceeded)
          this.books = response.data!;
        else
          this.errorMessage = response.message;
      });
  }

  tagClickEventHandler(tag: string) {
    console.log(tag);
  }

  cardClickEventHandler(id: number) {
    this.router.navigateByUrl(`/book?id=${id}`);
    console.log(id);
  }
}
