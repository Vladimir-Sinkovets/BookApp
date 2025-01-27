import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../services/auth.api-service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../auth.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent
{
  errorMessage = '';
  constructor(private auth: AuthApiService, private router: Router) { }
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
          if (response instanceof HttpResponse) {
            this.router.navigate(['/']);
          }
          else {
            this.errorMessage = response.message;
          }
        });
    }
  }
}
