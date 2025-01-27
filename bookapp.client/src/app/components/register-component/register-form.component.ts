import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthApiService } from '../../services/auth.api-service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: '../../shared/forms.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterFormComponent {
  constructor(private auth: AuthApiService, private router: Router) { }

  errorMessage: string = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.form.value.password != this.form.value.repeatPassword) {
      this.errorMessage = 'Passwords must be the same';
      return;
    }

    if (this.form.valid) {
      this.auth.register({
        email: this.form.value.email!,
        name: this.form.value.name!,
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
