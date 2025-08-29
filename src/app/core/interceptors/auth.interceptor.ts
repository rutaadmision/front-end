import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { SweetAlertService } from '../services/ui/sweet-alert.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const alertService = inject(SweetAlertService);
  const token = auth.getToken();

  function handleSessionExpired() {
    alertService.showError('Sesión vencida, serás redirigido a inicio');
    auth.logout();
    return EMPTY;
  }

  function handleOtherError() {
    alertService.showError('Hubo un error, por favor intente mas tarde');
    return EMPTY;
  }

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        debugger;
        return auth.refreshToken().pipe(
          switchMap((res) => {
            auth.setToken(res.access);
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${res.access}` },
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
