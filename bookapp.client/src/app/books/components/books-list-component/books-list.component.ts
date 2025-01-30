import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { BookApiService } from "../../services/book-api.service";
import { IBook } from "../../types/book.interface";
import { BooksCardComponent } from "../book-card-component/book-card.component";
import { Router } from "@angular/router";
import { PaginationComponent } from "../pagination-component/pagination.component";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
  standalone: true,
  imports: [BooksCardComponent, PaginationComponent],
})
export class BooksListComponent implements OnChanges {
  @Input() page: number = 1;
  @Input() lastPage: number = 1;
  @Input() booksPerPage: number = 20;

  @Output() pageChangedEvent = new EventEmitter<number>();

  errorMessage: string = '';
  books: IBook[] = [];
  constructor(private bookApi: BookApiService, private router: Router) { }

  ngOnChanges(): void {
    this.setPage(this.page);
  }

  tagClickEventHandler(tag: string) {
    console.log(tag);
  }

  cardClickEventHandler(id: number) {
    this.router.navigateByUrl(`/book/get/${id}`);
  }

  paginationClickHandler(page: number) {
    this.pageChangedEvent.emit(page);
  }

  private setPage(page: number) {
    this.page = page;

    this.bookApi.getPaginatedBooks(this.page, this.booksPerPage)
      .subscribe(response => {
        if (response.isSucceeded) {
          this.books = response.data?.books!;
          this.lastPage = response.data?.lastPage!;
        }
        else {
          this.errorMessage = response.message;
        }
      });
  }
}
