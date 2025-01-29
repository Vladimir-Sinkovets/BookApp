import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-tag-button',
  templateUrl: './tag-button.component.html',
  styleUrl: './tag-button.component.css',
  standalone: true,
  imports: [],
})
export class TagButtonComponent {
  @Input() tag: string = '';
  @Output() clickEvent = new EventEmitter<string>();

  clickHandler() {
    this.clickEvent.emit(this.tag);
  }
}
