import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TagButtonComponent } from "../../components/tag-component/tag-button.component";
import { BookApiService } from "../../services/book-api.service";
import { TagApiService } from "../../services/tag-api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-page',
  templateUrl: '../add-book/add-book.component.html',
  styleUrls: ['../../../shared/forms.css'],
  imports: [ReactiveFormsModule, TagButtonComponent]
})
export class UpdateBookComponent implements OnInit {
  errorMessage: string = '';
  tags: string[] = [];
  addedTags: string[] = [];

  id: number = 0;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fragment: new FormControl(''),
    selectedTag: new FormControl(''),
  });
  constructor(private tagApi: TagApiService, private bookApi: BookApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagApi.getTags()
      .subscribe(response => {
        this.tags = response.data ?? [];
      });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookApi.getBook(this.id)
      .subscribe(response => {
        if (response.isSucceeded) {
          this.form.setValue({
            title: response.data?.title ?? '',
            author: response.data?.author ?? '',
            description: response.data?.description ?? '',
            fragment: response.data?.fragment ?? '',
            selectedTag: '',
          })

          this.addedTags = response.data?.tags ?? [];
        }
      });
  }

  handleSubmit() {
    if (!this.form.valid || !this.addedTags)
      return;

    this.bookApi.updateBook({
      id: this.id,
      title: this.form.value.title!,
      author: this.form.value.author!,
      fragment: this.form.value.fragment!,
      description: this.form.value.description!,
      tags: this.addedTags,
    })
      .subscribe(response => {
        if (response.isSucceeded) {
          this.router.navigateByUrl(`book/get/${response.data?.id}`);
        }
        else {
          this.errorMessage = response.message;
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
    const index = this.addedTags.indexOf(tag);

    this.addedTags.splice(index, 1);
  }
}
