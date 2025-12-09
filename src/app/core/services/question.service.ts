import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Question, QuestionParams } from '../../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getQuestion(params: QuestionParams): Observable<Question[]> {

    let httpParams = new HttpParams();

    // Construir parámetros de query dinámicamente
    if (params.category) {
      httpParams = httpParams.set('category', params.category);
    }
    if (params.solved !== undefined) {
      httpParams = httpParams.set('solved', params.solved.toString());
    }
    if (params.random !== undefined) {
      httpParams = httpParams.set('random', params.random.toString());
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get<Question[]>(`${this.apiUrl}/questions/`, {
      params: httpParams
    }).pipe(
      retry(2), // Reintenta 2 veces si falla
      catchError(this.handleError)
    );

  }

  private handleError(error: any) {
    console.error('Error en la petición:', error);
    let errorMessage = 'Ocurrió un error al obtener las preguntas';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

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
