import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookApiService } from "../../services/book-api.service";
import { Book } from "../../types/book.type";

@Component({
  selector: 'app-book-page',
  templateUrl: './book.component.html',
  standalone: true,
  imports: []
})
export class BookComponent implements OnInit {
  id: number = 0;
  errorMessage: string = '';

  book?: Book = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private bookApi: BookApiService) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] ?? 1;

      if (this.id == 0) {
        this.router.navigate(['/']);
      }
    });

    this.bookApi.getBook(this.id)
      .subscribe(response => {
        if (response.isSucceeded)
          this.book = response.data;
        else
          this.errorMessage = response.message;
      });
  }
}
