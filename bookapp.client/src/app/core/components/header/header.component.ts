import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthApiService } from "../../../auth/services/auth.api-service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [RouterLink, NgIf],
})
export class HeaderComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;
  constructor(private auth: AuthApiService, private router: Router)
  {
    this.auth.isLoggedIn$
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;

        this.isAdmin = this.auth.isAdmin();
      });

    this.isLoggedIn = auth.isLoggedIn();

    this.isAdmin = this.auth.isAdmin();
  }

  logoutClick() {
    this.auth.logOut();

    this.router.navigateByUrl('auth/login');
  }
}
