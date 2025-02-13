import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../models/api-response.model";
import { User } from "../../models/user.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) { }

  getPaginatedUsers(page: number, usersPerPage: number): Observable<ApiResponse<{ users: User[], lastPage: number }>> {
    return this.http.get<ApiResponse<{ users: User[], lastPage: number }>>
      (`${environment.apiUrl}/api/user/all?page=${page}&itemsPerPage=${usersPerPage}`);
  }
}
