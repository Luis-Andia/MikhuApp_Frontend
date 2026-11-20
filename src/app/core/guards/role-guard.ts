
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

export const roleGuard: CanActivateFn = (route) => {

  const loginService = inject(Loginservice);
  const router = inject(Router);

  if (!loginService.isAuthenticated()) {
    loginService.logout();
    return router.createUrlTree(['/login']);
  }

  // Buscar los roles permitidos en la ruta actual
  // y, si no existen, revisar las rutas superiores.
  let rutaActual: ActivatedRouteSnapshot | null = route;
  let rolesPermitidos: string[] = [];

  while (rutaActual) {
    const roles = rutaActual.data['roles'];

    if (Array.isArray(roles) && roles.length > 0) {
      rolesPermitidos = roles;
      break;
    }

    rutaActual = rutaActual.parent;
  }

  // Si no hay restricciones de roles, permitir el acceso.
  if (rolesPermitidos.length === 0) {
    return true;
  }

  // Validar los permisos del usuario.
  if (loginService.hasAnyRole(rolesPermitidos)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
