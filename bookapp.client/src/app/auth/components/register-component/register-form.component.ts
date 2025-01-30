import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../services/auth.api-service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: '../../../../styles/forms.css',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterFormComponent {
  returnUrl: string;
  constructor(private auth: AuthApiService, private router: Router, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

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
