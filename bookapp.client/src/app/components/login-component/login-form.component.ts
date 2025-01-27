import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth.api-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: '../../shared/forms.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginFormComponent {
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
