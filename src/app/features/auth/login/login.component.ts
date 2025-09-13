import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MapRoutes } from '../../../map-routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  MapRoutes = MapRoutes;
  showPassword = signal<boolean>(false);
  showError = signal<boolean>(false);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private auth: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  // Login method
  onLogin() {
    if (!this.loginForm.valid) {
      this.showError.set(true);
    } else {
      this.auth.login(this.email.value, this.password.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => alert('Login failed: ' + err.message),
      });
    }
  }

  async handleGoogleLogin(): Promise<void> {
    try {
      await this.auth.logInGoogle();
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }
}
