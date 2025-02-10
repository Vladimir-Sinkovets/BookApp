import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: '../../../../styles/forms.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginFormComponent {
  returnUrl: string;
  errorMessage = '';
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    if (this.form.valid) {
      this.auth.login({
        email: this.form.value.email!,
        password: this.form.value.password!,
      })
        .subscribe(response => {
          if (response.isSucceeded) {
            this.router.navigateByUrl(this.returnUrl);
          }
          else {
            this.errorMessage = response.message;
          }
        });
    }
  }
}
