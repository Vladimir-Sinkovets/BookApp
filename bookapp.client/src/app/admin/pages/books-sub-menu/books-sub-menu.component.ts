import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-books-sub-menu-component',
  templateUrl: './books-sub-menu.component.html',
  styleUrls: ['./books-sub-menu.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class BookSubMenuComponent { }
