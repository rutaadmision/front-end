import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SignupDataService } from '../../../core/services/signup-data.service';
import { SweetAlertService } from '../../../core/services/ui/sweet-alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent implements OnInit {
  private alertService = inject(SweetAlertService);
  email = '';
  code = '';

  constructor(
    private signupData: SignupDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.signupData.email;

    if (!this.email) {
      this.router.navigate(['/signup']);
    }
  }

  onCodeChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.code = input.replace(/\D/g, '').slice(0, 6);

    if (this.code.length === 6) {
      this.submitCode();
    }
  }

  submitCode() {
    this.authService.verifyEmail(this.email, this.code).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Verification failed', err);
        this.code = '';
      },
    });
  }

  resendVerification() {
    this.authService
      .signup(
        this.signupData.name,
        this.signupData.lastName,
        this.signupData.email,
        this.signupData.password
      )
      .subscribe({
        next: () => {
          this.alertService.showSuccess('Email de verificación enviado');
        },
        error: (err: { message: string }) => {
          alert('Signup failed: ' + err.message);
        },
      });
  }
}
