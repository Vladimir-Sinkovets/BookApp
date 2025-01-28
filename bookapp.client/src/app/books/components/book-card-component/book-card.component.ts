import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
  standalone: true,
  imports: [],
})
export class BooksCardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() tags: string[] = [];
  @Output() tagClickEvent = new EventEmitter<string>();
  @Output() cardClickEvent = new EventEmitter<number>();

  tagClickHandler(tag: string) {
    this.tagClickEvent.emit(tag);
  }

  cardClickHandler() {
    this.cardClickEvent.emit(this.id);
  }
}
