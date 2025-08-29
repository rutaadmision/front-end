import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http
      .post<{ refreshToken: string, accessToken: string  }>(`${this.apiUrl}/users/token/`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.setToken(res.accessToken);
          this.setRefreshToken(res.refreshToken);
        })
      );
  }

  signup(username: string, password: string) {
    return this.http
      .post<{ refreshToken: string, accessToken: string }>(`${this.apiUrl}/users/register/`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.setToken(res.accessToken);
          this.setRefreshToken(res.refreshToken);
        })
      );
  }

  refreshToken() {
    const refreshtoken = this.getRefreshToken();
    return this.http
      .post<{ access: string }>(`${this.apiUrl}/users/token/refresh/`, { 'refresh':refreshtoken })
  }



  logout() {
    this.logOutGoogle();
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/']);
  }

  getToken(): string | null | undefined {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(accessToken: string) {
    localStorage.setItem(this.tokenKey, accessToken);
  }


  setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    const token =this.getToken();
    return token !== null && token !== "undefined" && token !== '';
  }

  getGoogleAuth() {
    return getAuth();
  }

  async logInGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.getGoogleAuth(), provider);
      const user = result.user;
      if (!user) {
        throw new Error('Google-Login error');
      } else {
        localStorage.setItem(this.tokenKey, (await user.getIdTokenResult(true)).token);
      }
    } catch (error) {
      console.error('Google-Login error:', error);
      throw error;
    }

  }

  private logOutGoogle() {
    return signOut(this.getGoogleAuth());
  }



}
