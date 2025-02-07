import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TagApiService } from "../../../books/services/tag-api.service";
import { TagButtonComponent } from "../../../books/components/tag-component/tag-button.component";

@Component({
  selector: 'tags-management-component',
  templateUrl: './tags-management.component.html',
  styleUrls: ['./tags-management.component.css', '../../../../styles/forms.css'],
  standalone: true,
  imports: [TagButtonComponent, ReactiveFormsModule]
})
export class TagsManagementComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = false;

  form = new FormGroup({
    newTag: new FormControl('', Validators.required),
  });

  tags: string[] = [];

  constructor(private tagApi: TagApiService) { }

  ngOnInit(): void {
    this.loadTags();
  }

  private loadTags() {
    this.isLoading = true;
    this.tagApi.getTags()
      .subscribe(response => {
        if (response.isSucceeded) {
          this.tags = response.data ?? [];
        }
        else {
          this.errorMessage = response.message;
        }
        this.isLoading = false;
      });
  }

  tagClickHandler(tag: string) {
    if (confirm(`Are you sure you want to delete (${tag})?`)) {
      this.tagApi.deleteTag(tag)
        .subscribe(response => {
          this.loadTags();
        });
    }
  }

  addButtonClickHandler() {
    if (!this.form.valid)
      return;

    this.tagApi.addTag(this.form.value.newTag!)
      .subscribe(response => {
        if (response.isSucceeded) {
          this.loadTags();
          this.errorMessage = '';
          this.form.setValue({
            newTag: '',
          });
        }
        else {
          this.errorMessage = response.message;
        }
      });
  }
}
