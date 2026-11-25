import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  // No enviar el token en las peticiones de login
  if (req.url.includes('/login')) {
    return next(req);
  }

  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const backendUrl = environment.base.endsWith('/')
    ? environment.base
    : `${environment.base}/`;
    
  if (!req.url.startsWith(backendUrl)) {
    return next(req);
  }

  if (req.url.endsWith('/login')) {
    return next(req);
  }

  const token = sessionStorage.getItem('token');
  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
  );
};
