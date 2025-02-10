import { Component, OnInit } from "@angular/core";
import { BooksListComponent } from "../../components/books-list/books-list.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-books-page',
  templateUrl: './books.component.html',
  standalone: true,
  imports: [BooksListComponent]
})
export class BooksComponent implements OnInit {
  page: number = 1;
  booksPerPage: number = 16;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.setPage();
  }

  pageChangedEventHandler(page: number) {
    this.router.navigateByUrl(`book/list/${page}`)
      .then(v => {
        this.setPage()
      });
  }

  private setPage() {
    this.page = Number(this.route.snapshot.paramMap.get('page'));
  }
}
