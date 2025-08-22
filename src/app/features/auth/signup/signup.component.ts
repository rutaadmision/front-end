import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  private fb = inject(FormBuilder)

  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  signUpForm = this.fb.group({
    'name': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    'password': ['', [Validators.required,Validators.minLength(8)]]
  });

  get name () {
    return this.signUpForm.get('name') as FormControl;
  }

  get email () {
    return this.signUpForm.get('email') as FormControl;
  }

  get password () {
    return this.signUpForm.get('password') as FormControl;
  }
}
