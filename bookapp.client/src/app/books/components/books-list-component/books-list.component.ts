import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { BookCardComponent } from "../book-card-component/book-card.component";
import { Router } from "@angular/router";
import { PaginationComponent } from "../pagination-component/pagination.component";
import { BookApiService } from "../../../shared/services/book-api/book-api.service";
import { Book } from "../../../shared/models/book.model";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css', '../../../../styles/forms.css'],
  standalone: true,
  imports: [BookCardComponent, PaginationComponent],
})
export class BooksListComponent implements OnChanges {
  @Input() page: number = 1;
  @Input() lastPage: number = 1;
  @Input() booksPerPage: number = 20;

  @Output() pageChangedEvent = new EventEmitter<number>();

  errorMessage: string = '';
  books: Book[] = [];
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
