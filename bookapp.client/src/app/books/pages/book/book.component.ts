import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TagButtonComponent } from "../../components/tag/tag-button.component";
import { Book } from "../../../shared/models/book.model";
import { BookApiService } from "../../../shared/services/book-api/book-api.service";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-book-page',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: true,
  imports: [TagButtonComponent, CommonModule]
})
export class BookComponent implements OnInit {
  id: number = 0;
  errorMessage: string = '';

  isAdmin: boolean;

  book?: Book = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private bookApi: BookApiService, private auth: AuthService) {
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
