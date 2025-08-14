import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  // Login method
  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/problems']),
      error: (err) => alert('Login failed: ' + err.message),
    });
  }

  // Signup method
  onSignup() {
    this.auth.signup(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/problems']),
      error: (err) => alert('Signup failed: ' + err.message),
    });
  }
}
