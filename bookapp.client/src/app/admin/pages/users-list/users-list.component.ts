import { Component, OnInit } from "@angular/core";
import { User } from "../../../shared/models/user.model";
import { UsersApiService } from "../../../shared/services/users-api/users-api.service";
import { PaginationComponent } from "../../../books/components/pagination/pagination.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrl: 'users-list.component.css',
  imports: [PaginationComponent, CommonModule],
})
export class UsersList implements OnInit {
  users: User[] = [];

  isLoading: boolean = false;

  usersPerPage = 10;
  page = 1;
  lastPage = 1;

  constructor(private usersApi: UsersApiService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  paginationClickHandler(page: number) {
    this.page = page;

    this.loadPage();
  }

  private loadPage() {
    this.isLoading = true;

    this.usersApi.getPaginatedUsers(this.page, this.usersPerPage)
      .subscribe(response => {
        this.users = response.data?.users ?? [];
        this.lastPage = response.data?.lastPage ?? 1;
        this.isLoading = false;
      });
  }
}
