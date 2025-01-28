import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-component/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../auth.css',
  standalone: true,
  imports: [LoginFormComponent]
})
export class LoginComponent { }
