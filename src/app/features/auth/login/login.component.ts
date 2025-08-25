import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  loginForm = this.fb.group({
    'email': ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    'password': ['', [Validators.required]]
  });

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private auth: AuthService, private router: Router) { }


  // Login method
  onLogin() {

    this.auth.login(this.email.value, this.password.value).subscribe({
      next: () => {
        console.log()
        this.router.navigateByUrl('/dashboard')

      },
      error: (err) => alert('Login failed: ' + err.message),
    });
  }

  async handleGoogleLogin(): Promise<void> {
    try {
      await this.auth.logInGoogle();
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }


  // Signup method
  /*onSignup() {
    this.auth.signup(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/problems']),
      error: (err) => alert('Signup failed: ' + err.message),
    });
  }*/
}
