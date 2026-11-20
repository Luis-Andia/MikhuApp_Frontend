import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userlistDTO } from '../models/UserlistDTO';
import { UserinsertDTO } from '../models/UserinsertDTO';

@Service()
export class Userservice {
  private apiURL = `${environment.base}/api/users`;
  private http = inject(HttpClient);

  getUsers(): Observable<userlistDTO[]> {
    const url = `${this.apiURL}`;
    return this.http.get<userlistDTO[]>(url);
  }

  insertUser(dto: UserinsertDTO): Observable<UserinsertDTO> {
    const url = `${this.apiURL}`;
    return this.http.post<UserinsertDTO>(url, dto);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  listId(id: number): Observable<userlistDTO> {
    return this.http.get<userlistDTO>(`${this.apiURL}/${id}`);
  }

  updateUser(dto: UserinsertDTO): Observable<UserinsertDTO> {
    return this.http.put<UserinsertDTO>(this.apiURL, dto);
  }

  getuserbyusername(username:String):Observable<userlistDTO[]>{
        const url = `${this.apiURL}/username/${username}`;
        return this.http.get<userlistDTO[]>(url)
    }

}
