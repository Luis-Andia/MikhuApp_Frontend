
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RoleDTO } from '../models/RoleDTO';

@Injectable({
  providedIn: 'root'
})
export class Roleservice {

  private apiURL = `${environment.base}/api/roles`;
  private http = inject(HttpClient);

  listarRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(this.apiURL);
  }

  registrarRol(dto: RoleDTO): Observable<RoleDTO> {
    return this.http.post<RoleDTO>(this.apiURL, dto);
  }

  buscarRol(id: number): Observable<RoleDTO> {
    return this.http.get<RoleDTO>(`${this.apiURL}/${id}`);
  }

  actualizarRol(dto: RoleDTO): Observable<RoleDTO> {
    return this.http.put<RoleDTO>(this.apiURL, dto);
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
