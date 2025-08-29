import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { SweetAlertService } from '../../../core/services/ui/sweet-alert.service';
import { passwordValidator } from '../../../shared/validators/password.validator';


@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  private fb = inject(FormBuilder)
  private alertService = inject(SweetAlertService);
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  signUpForm = this.fb.group({
    'name': ['Ronny Castro', [Validators.required]],
    'email': ['ronnyale0@hotmail.com', [Validators.required, Validators.pattern(this.emailRegex)]],
    'password': ['', [Validators.required, passwordValidator()]]
  });

  
  get name() {
    return this.signUpForm.get('name') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  constructor(private auth: AuthService, private router: Router) { }



  onSignup() {
    this.auth.signup(this.email.value, this.password.value).subscribe({
      next: () => {
        this.alertService.showSuccess("Cuenta creada exitosamente");
        this.router.navigateByUrl('/dashboard')

      },
      error: (err: { message: string; }) => {
        alert('Signup failed: ' + err.message)
      },
    });
  }

}
