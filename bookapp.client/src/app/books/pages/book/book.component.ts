import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookApiService } from "../../services/book-api.service";
import { IBook } from "../../models/book.model";
import { TagButtonComponent } from "../../components/tag-component/tag-button.component";
import { AuthApiService } from "../../../auth/services/auth.api-service";

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

  isAdmin: boolean;

  book?: IBook = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private bookApi: BookApiService, private auth: AuthApiService) {
    this.isAdmin = this.auth.isAdmin();
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

    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isAdmin = this.auth.isAdmin();
    });
  }

  editClick() {
    this.router.navigateByUrl(`book/update/${this.id}`);
  }
}
