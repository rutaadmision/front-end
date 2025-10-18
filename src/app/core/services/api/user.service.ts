import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface User {
  firstName: string;
  lastName: string;
  subscriptionTier: 'free' | 'pro' | 'premium';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  user = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  fetchCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/users/me/`).pipe(
      tap((data) => this.user.set(data)),
      catchError((err) => {
        console.error('Failed to fetch user:', err);
        this.user.set(null);
        return of(null);
      })
    );
  }

  clearUser() {
    this.user.set(null);
  }
}
