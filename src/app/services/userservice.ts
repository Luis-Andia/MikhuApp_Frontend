
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { userlistDTO } from '../models/UserlistDTO';
import { UserinsertDTO } from '../models/UserinsertDTO';
import {
  UserRegisterDTO,
  UserRegisterResponseDTO
} from '../models/UserRegisterDTO';

@Injectable({
  providedIn: 'root'
})
export class Userservice {

  private apiURL = `${environment.base}/api/users`;
  private http = inject(HttpClient);

  // Registrar un usuario nuevo
  registerUser(dto: UserRegisterDTO): Observable<UserRegisterResponseDTO> {
    return this.http.post<UserRegisterResponseDTO>(
      this.apiURL,
      dto
    );
  }

  // Listar usuarios
  getUsers(): Observable<userlistDTO[]> {
    return this.http.get<userlistDTO[]>(this.apiURL);
  }

  // Insertar usuario desde administración
  insertUser(dto: UserinsertDTO): Observable<UserinsertDTO> {
    return this.http.post<UserinsertDTO>(this.apiURL, dto);
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  // Buscar usuario por ID
  listId(id: number): Observable<userlistDTO> {
    return this.http.get<userlistDTO>(`${this.apiURL}/${id}`);
  }

  // Actualizar usuario
  updateUser(id: number, dto: UserinsertDTO): Observable<UserinsertDTO> {
    return this.http.put<UserinsertDTO>(`${this.apiURL}/${id}`, dto);
  }

  // Buscar usuario por nombre de usuario
  getuserbyusername(username: string): Observable<userlistDTO[]> {
    return this.http.get<userlistDTO[]>(
      `${this.apiURL}/username/${username}`
    );
  }
}
