import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  private refreshtoken = 'access_token';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string,  refresh: string}>(`${this.apiUrl}/users/token/`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.access_token);
          localStorage.setItem(this.refreshtoken, res.refresh);
        })
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

  refreshToken(){

  }



  logout() {
    this.logOutGoogle();
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  getRefreshToken(){
    return localStorage.getItem(this.refreshtoken);
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
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
      }else{
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
