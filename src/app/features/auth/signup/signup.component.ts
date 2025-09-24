import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SignupDataService } from '../../../core/services/signup-data.service';
import { SweetAlertService } from '../../../core/services/ui/sweet-alert.service';
import { MapRoutes } from '../../../map-routes';
import { passwordValidator } from '../../../shared/validators/password.validator';
@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private alertService = inject(SweetAlertService);

  showError = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  MapRoutes = MapRoutes;
  signUpForm = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', [Validators.required, passwordValidator()]],
  });

  get name() {
    return this.signUpForm.get('name') as FormControl;
  }

  get lastName() {
    return this.signUpForm.get('lastName') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  constructor(
    private auth: AuthService,
    private signupData: SignupDataService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  /*onSignup() {
    if (!this.signUpForm.valid) {
      this.showError.set(true);
    } else {
      this.auth
        .signup(
          this.name.value,
          this.lastName.value,
          this.email.value,
          this.password.value
        )
        .subscribe({
          next: () => {
            this.alertService.showSuccess('Cuenta creada exitosamente');
            this.router.navigateByUrl('/dashboard');
          },
          error: (err: { message: string }) => {
            alert('Signup failed: ' + err.message);
          },
        });
    }
  }*/
  onSignup() {
    if (!this.signUpForm.valid) {
      this.showError.set(true);
    } else {
      this.auth
        .signup(
          this.name.value,
          this.lastName.value,
          this.email.value,
          this.password.value
        )
        .subscribe({
          next: () => {
            this.signupData.name = this.name.value;
            this.signupData.lastName = this.lastName.value;
            this.signupData.email = this.email.value;
            this.signupData.password = this.password.value;
            this.alertService.showSuccess('Email de verificación enviado');
            this.router.navigateByUrl('/auth/verify-email');
          },
          error: (err: { message: string }) => {
            alert('Signup failed: ' + err.message);
          },
        });
    }
  }
}
