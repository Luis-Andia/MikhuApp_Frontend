
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { loginresponseDTO } from '../models/loginresponseDTO';
import { loginrequestDTO } from '../models/loginrequestDTO';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {

  private apiURL = `${environment.base}/login`;
  private http = inject(HttpClient);

  // Iniciar sesión
  postlogin(dto: loginrequestDTO): Observable<loginresponseDTO> {
    return this.http.post<loginresponseDTO>(this.apiURL, dto).pipe(
      tap(response => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('username', response.username);
        }
      })
    );
  }

  // Obtener token
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return sessionStorage.getItem('token');
  }

  // Obtener nombre del usuario
  getUsername(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return sessionStorage.getItem('username');
  }

  // Obtener información del JWT
  private getTokenPayload(): any {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];

      const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const decoded = atob(base64);

      return JSON.parse(decoded);

    } catch {
      return null;
    }
  }

  // Comprobar si el token expiró
  isExpired(): boolean {
    const payload = this.getTokenPayload();

    if (!payload || typeof payload.exp !== 'number') {
      return true;
    }

    return payload.exp * 1000 <= Date.now();
  }

  // Obtener roles del usuario
  getRoles(): string[] {
    const payload = this.getTokenPayload();

    if (!payload || typeof payload.roles !== 'string') {
      return [];
    }

    return payload.roles
      .split(',')
      .map((role: string) => role.trim())
      .filter((role: string) => role.length > 0);
  }

  // Comprobar si tiene alguno de los roles indicados
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getRoles();

    return roles.some(role => userRoles.includes(role));
  }

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken() && !this.isExpired();
  }

  // Cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
    }
  }

  // Validar sesión
  validarSesion(): void {
    if (this.getToken() && this.isExpired()) {
      this.logout();
    }
  }

  // Métodos de compatibilidad con las rutas actuales
  obtenerToken(): string | null {
    return this.getToken();
  }

  tokenExpirado(): boolean {
    return this.isExpired();
  }

  cerrarSesion(): void {
    this.logout();
  }
}
