import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Question } from '../../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  category(category: string): Observable<Question[]> {
    return this.http
      .get<Question[]>(`${this.apiUrl}/questions/?category=${category}`)
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error('Failed to fetch category data'));
        })
      );
  }
}
