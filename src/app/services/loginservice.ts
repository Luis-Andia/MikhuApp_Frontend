import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { loginresponseDTO } from '../models/loginresponseDTO';
import { loginrequestDTO } from '../models/loginrequestDTO';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {

  private readonly apiURL = `${environment.base}/login`;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID)); // Browser Common; ID Core
  
  private http = inject(HttpClient);

  // Iniciar sesión
  login(credentials: loginrequestDTO): Observable<loginresponseDTO> {
    return this.http.post<loginresponseDTO>(this.apiURL, credentials).pipe(
      tap((response) => {
        if (!response?.token) {
          throw new Error('La respuesta de login no contiene un token.');
        }

        if (this.isBrowser) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('username', response.username ?? '');
          sessionStorage.setItem('roles', JSON.stringify(response.roles ?? []));
        }
      })
    );
  }

  // Obtener token
  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }

    if (this.isExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  // Obtener nombre del usuario
  getUsername(): string {
    if (!this.isBrowser || !this.isAuthenticated()) {
      return '';
    }

    return sessionStorage.getItem('username') ?? '';
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
  private isExpired(token: string): boolean {
    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart) {
        return true;
      }

      const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const payload: unknown = JSON.parse(
        atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))
      );

      if (payload === null || typeof payload !== 'object' || !('exp' in payload)) {
        return true;
      }

      const exp = payload.exp;
      return typeof exp !== 'number' || !Number.isFinite(exp) || exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  // Obtener roles del usuario
  getRoles(): string[] {
    if (!this.isBrowser || !this.isAuthenticated()) {
      return [];
    }

    const value = sessionStorage.getItem('roles');
    if (!value) {
      return [];
    }

    try {
      const roles: unknown = JSON.parse(value);

      if (Array.isArray(roles) && roles.every((role) => typeof role === 'string')) {
        return roles;
      }
    } catch {
      sessionStorage.removeItem('roles');
      return [];
    }

    sessionStorage.removeItem('roles');
    return [];
  }

  // Comprobar si tiene alguno de los roles indicados
  hasAnyRole(allowedRoles: readonly string[]): boolean {
    const normalize = (role: string) =>
      role.startsWith('ROLE_') ? role.slice('ROLE_'.length) : role;

    const allowed = new Set(allowedRoles.map(normalize));
    return this.getRoles().some((role) => allowed.has(normalize(role)));
  }

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Cerrar sesión
  logout(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('roles');
    }
  }
}
