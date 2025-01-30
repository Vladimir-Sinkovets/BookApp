import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookApiService } from "../../services/book-api.service";
import { IBook } from "../../types/book.interface";
import { TagButtonComponent } from "../../components/tag-component/tag-button.component";

@Component({
  selector: 'app-book-page',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: true,
  imports: [TagButtonComponent]
})
export class BookComponent implements OnInit {
  id: number = 0;
  errorMessage: string = '';

  book?: IBook = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private bookApi: BookApiService) {
  }
  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id == 0) {
      this.router.navigate(['/']);
    }

    this.bookApi.getBook(this.id)
      .subscribe(response => {
        if (response.isSucceeded)
          this.book = response.data;
        else
          this.errorMessage = response.message;
      });
  }
}
