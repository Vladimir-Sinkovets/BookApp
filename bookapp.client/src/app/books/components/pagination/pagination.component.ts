import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: true,

})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() lastPage: number = 1;
  @Output() buttonClickEvent = new EventEmitter<number>();

  onButtonClickHandler(page: number) {
    this.buttonClickEvent.emit(page);
  }
}
