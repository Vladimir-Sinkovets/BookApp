import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent {
  form = new FormGroup({

  });
}
