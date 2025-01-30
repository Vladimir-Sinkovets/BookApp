import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TagButtonComponent } from "../../components/tag-component/tag-button.component";
import { TagApiService } from "../../services/tag-api.service";
import { BookApiService } from "../../services/book-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book.component.html',
  styleUrls: ['../../../shared/forms.css'],
  standalone: true,
  imports: [ReactiveFormsModule, TagButtonComponent]
})
export class AddBookComponent implements OnInit {
  errorMessage: string = '';
  tags: string[] = [];
  addedTags: string[] = [];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fragment: new FormControl(''),
    selectedTag: new FormControl(''),
  })

  constructor(private tagApi: TagApiService, private bookApi: BookApiService, private router: Router) { }

  ngOnInit(): void {
    this.tagApi.getTags()
      .subscribe(response => {
        this.tags = response.data ?? [];
      })
  }

  handleSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.bookApi.addBook({
      title: this.form.value.title!,
      author: this.form.value.author!,
      description: this.form.value.description!,
      fragment: this.form.value.fragment!,
      tags: this.addedTags,
    })
      .subscribe(response => {
        if (!response.isSucceeded) {
          this.errorMessage = response.message;
        }
        else {
          this.router.navigateByUrl(`/book?id=${response.data?.id}`);
        }
      });
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
