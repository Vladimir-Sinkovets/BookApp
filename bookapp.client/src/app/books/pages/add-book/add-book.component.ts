import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TagButtonComponent } from "../../components/tag-component/tag-button.component";
import { TagApiService } from "../../services/tag-api.service";
import { BookApiService } from "../../services/book-api.service";

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book.component.html',
  styleUrls: ['../../../shared/forms.css'],
  standalone: true,
  imports: [ReactiveFormsModule, TagButtonComponent]
})
export class AddBookComponent implements OnInit {

  tags: string[] = [];
  addedTags: string[] = [];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fragment: new FormControl(''),
    selectedTag: new FormControl('', Validators.required),
  })

  constructor(private tagApi: TagApiService, private bookApi: BookApiService) { }

  ngOnInit(): void {
    this.tagApi.getTags()
      .subscribe(response => {
        this.tags = response.data ?? [];
      })
  }

  handleSubmit() {

  }

  addTagHandler() {
    const selectedTag = this.form.value.selectedTag;

    if (!selectedTag)
      return;

    if (!this.addedTags.includes(selectedTag))
      this.addedTags.push(selectedTag);
  }

  tagClickHandler(tag: string) {
    const index =this.addedTags.indexOf(tag);

    this.addedTags.splice(index, 1);
  }
}
