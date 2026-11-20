
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(Loginservice);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }

  loginService.logout();

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
