import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../models/api-response.model";
import { Tag } from "../../models/tag.model";

@Injectable({
  providedIn: 'root',
})
export class TagApiService {
  constructor(private http: HttpClient) { }

  getTags(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<{ tags:{ name: string, id: number }[] }>>(`${environment.apiUrl}/api/tag/all`)
      .pipe(
        map(response => {
          return {
            isSucceeded: response.isSucceeded,
            message: response.message,
            data: response.data!.tags.map(t => t.name),
          }
        }
      ));
  }

  addTag(tagName: string): Observable<ApiResponse<Tag>> {
    return this.http.post<ApiResponse<Tag>>(`${environment.apiUrl}/api/tag/create`, { name: tagName });
  }
  deleteTag(tagName: string): Observable<ApiResponse<undefined>> {
    return this.http.delete<ApiResponse<undefined>>(`${environment.apiUrl}/api/tag/delete?name=${tagName}`);
  }
}
