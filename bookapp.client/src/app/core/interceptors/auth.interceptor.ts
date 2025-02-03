import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, switchMap, EMPTY } from "rxjs";
import { AuthApiService } from "../../auth/services/auth.api-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;
  constructor(private auth: AuthApiService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAccessTokenExpired = this.auth.isAccessTokenExpired();
    const isRefreshTokenExpired = this.auth.isRefreshTokenExpired();

    if (isAccessTokenExpired && !this.isRefreshing) {
      if (!isRefreshTokenExpired) {
        this.isRefreshing = true;

        return this.auth.refreshAccessToken()
          .pipe(
            switchMap(response => {
              this.isRefreshing = false;

              return next.handle(this.createRequestWithToken(req));
            })
          );
      }
      else {
        this.router.navigateByUrl('/auth/login');
      }
    }

    return next.handle(this.createRequestWithToken(req));
  }

    private createRequestWithToken(req: HttpRequest<any>) {
        const accessToken = this.auth.getAccessToken();

        if (accessToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        }
        return req;
    }
}
