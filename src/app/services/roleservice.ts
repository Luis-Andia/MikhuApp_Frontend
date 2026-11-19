import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleDTO } from '../models/RoleDTO';

@Service()
export class Roleservice {
  private apiURL = `${environment.base}/api/roles`;
  private http = inject(HttpClient);

  getRoles(): Observable<RoleDTO[]> {
    const url = `${this.apiURL}`;
    return this.http.get<RoleDTO[]>(url);
  }

  insertRole(dto: RoleDTO): Observable<RoleDTO> {
    const url = `${this.apiURL}`;
    return this.http.post<RoleDTO>(url, dto);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  listId(id: number): Observable<RoleDTO> {
    return this.http.get<RoleDTO>(`${this.apiURL}/${id}`);
  }

  updateRole(dto: RoleDTO): Observable<RoleDTO> {
    return this.http.put<RoleDTO>(this.apiURL, dto);
  }
}
