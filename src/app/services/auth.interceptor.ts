
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  // No enviar token en las peticiones públicas
  const isLogin = req.url.includes('/login');
  const isCountryRequest = req.url.includes('/api/countries');
  const isUserRegistration =
    req.url.includes('/api/users') && req.method === 'POST';

  if (isLogin || isCountryRequest || isUserRegistration) {
    return next(req);
  }

  const backendUrl = environment.base.endsWith('/')
    ? environment.base
    : `${environment.base}/`;

  if (!req.url.startsWith(backendUrl)) {
    return next(req);
  }

  const token = sessionStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
