
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // No enviar el token en las peticiones de login.
  if (req.url.includes('/login')) {
    return next(req);
  }

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
  }

  const request = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        (error.status === 401 || error.status === 403) &&
        token &&
        typeof window !== 'undefined'
      ) {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
