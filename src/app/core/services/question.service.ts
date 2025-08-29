import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  category(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/questions/?category=Math`).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Failed to fetch category data'));
      })
    );
  }
}
