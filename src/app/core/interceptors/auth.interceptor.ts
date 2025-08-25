import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  function handleSessionExpired() {
    alert('Sesión vencida, serás redirigido a inicio');
    auth.logout();
    return EMPTY;
  }

  function handleOtherError() {
    alert('Hubo en error intente mas tarde');
    return EMPTY;
  }

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `token ${token}` },
    });
  }
  console.log(req);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        return auth.refreshToken().pipe(
          switchMap((res) => {
            auth.setToken(res.access);
            req = req.clone({
              setHeaders: { Authorization: `token ${res.access}` },
            });
            return next(req);
          }),
          catchError(() => {
            return handleSessionExpired();

          })
        );
      }
      return handleOtherError();
    })
  );
};
