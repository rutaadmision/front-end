import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,JsonPipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
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
    console.log(this.loginForm.valid);
    /*this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/problems']),
      error: (err) => alert('Login failed: ' + err.message),
    });*/
  }

  // Signup method
  /*onSignup() {
    this.auth.signup(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/problems']),
      error: (err) => alert('Signup failed: ' + err.message),
    });
  }*/
}
