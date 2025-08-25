import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  category(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/questions/?category=Math`).pipe(
        catchError((error: any) => {
          console.error('Error fetching category data', error);
          return throwError(() => new Error('Failed to fetch category data'));
        })
      );
  }

}
