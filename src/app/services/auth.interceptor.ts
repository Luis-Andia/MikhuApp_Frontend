
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let token: string | null = null;

  // localStorage solo existe en el navegador, no en SSR.
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
  }

  if (token) {
    const requestConToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(requestConToken);
  }

  return next(req);
};
