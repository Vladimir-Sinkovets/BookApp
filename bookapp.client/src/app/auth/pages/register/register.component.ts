import { Component } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterFormComponent } from '../../../components/register-component/register-form.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrl: '../auth.css',
  standalone: true,
  imports: [ReactiveFormsModule, RegisterFormComponent]
})
export class RegisterComponent { }
