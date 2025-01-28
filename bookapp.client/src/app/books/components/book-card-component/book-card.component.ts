import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
  standalone: true,
  imports: [],
})
export class BooksCardComponent {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() tags: string[] = [];
}
