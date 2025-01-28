import { Component } from "@angular/core";
import { BooksListComponent } from "../../components/books-list-component/books-list.component";

@Component({
  selector: 'app-books-page',
  templateUrl: './books.component.html',
  standalone: true,
  imports: [BooksListComponent]
})
export class BooksComponent {

}
