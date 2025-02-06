import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { TagApiService } from "../../../books/services/tag-api.service";
import { TagButtonComponent } from "../../../books/components/tag-component/tag-button.component";

@Component({
  selector: 'tags-management-component',
  templateUrl: './tags-management.component.html',
  styleUrls: ['./tags-management.component.css'],
  standalone: true,
  imports: [TagButtonComponent]
})
export class TagsManagementComponent implements OnInit {
  form = new FormGroup({
    newTag: new FormControl(''),
  });

  tags: string[] = [];

  constructor(private tagApi: TagApiService) { }

  ngOnInit(): void {
    this.tagApi.getTags()
      .subscribe(response => {
        this.tags = response.data ?? [];
      });
  }

  tagClickHandler(tag: string) {

  }

  addButtonClickHandler() {

  }
}
