
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

  postlogin(dto: loginrequestDTO): Observable<loginresponseDTO> {
    return this.http.post<loginresponseDTO>(this.apiURL, dto).pipe(
      tap(response => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        }
      })
    );
  }

  obtenerToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem('token');
  }

  tokenExpirado(): boolean {
    const token = this.obtenerToken();

    if (!token) {
      return true;
    }

    try {
      const payload = token.split('.')[1];
      const datos = JSON.parse(atob(payload));

      return !datos.exp || datos.exp * 1000 <= Date.now();

    } catch {
      return true;
    }
  }

  validarSesion(): void {
    if (
      typeof window !== 'undefined' &&
      this.obtenerToken() &&
      this.tokenExpirado()
    ) {
      this.cerrarSesion();
    }
  }

  cerrarSesion(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }
}
