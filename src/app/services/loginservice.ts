
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
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
      })
    );
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
