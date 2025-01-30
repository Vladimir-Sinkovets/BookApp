import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { ApiResponse } from "../../shared/models/api-response.type";

@Injectable({
  providedIn: 'root',
})
export class TagApiService {
  private domain = 'https://localhost:7085';
  constructor(private http: HttpClient) { }

  getTags(): Observable<ApiResponse<string[]>> {
    return this.http.get<{ name: string, id: number }[]>(`${this.domain}/api/tag/all`)
      .pipe(
        map(response => {
          return {
            isSucceeded: true,
            message: 'success',
            data: response.map(t => t.name),
          }
        }
      ));
  }
}
