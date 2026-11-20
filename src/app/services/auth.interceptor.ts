
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  // No enviar el token en las peticiones de login
  if (req.url.includes('/login')) {
    return next(req);
  }

  let token: string | null = null;

  // Obtener el token de la sesión del navegador
  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }

  // Agregar el token JWT a la petición
  const request = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {

      // Si el token no es válido o expiró
      if (
        error.status === 401 &&
        token &&
        typeof window !== 'undefined'
      ) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
