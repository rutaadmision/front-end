import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/token/`, {
        username,
        password,
      })
      .pipe(
        tap((res) => localStorage.setItem(this.tokenKey, res.access_token))
      );
  }

  signup(username: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/register/`, {
        username,
        password,
      })
      .pipe(
        tap((res) => localStorage.setItem(this.tokenKey, res.access_token))
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
