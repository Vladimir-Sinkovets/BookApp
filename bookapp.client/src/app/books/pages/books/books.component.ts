import { Component, OnInit } from "@angular/core";
import { BooksListComponent } from "../../components/books-list-component/books-list.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-books-page',
  templateUrl: './books.component.html',
  standalone: true,
  imports: [BooksListComponent]
})
export class BooksComponent implements OnInit {
  page: number = 1;
  booksPerPage: number = 1;

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] ?? 1;
      this.booksPerPage = params['booksperpage'] ?? 16;
    });
  }
}
