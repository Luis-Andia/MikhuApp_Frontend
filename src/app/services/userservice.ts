import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userlistDTO } from '../models/UserlistDTO';

@Service()
export class Userservice {
    private apiURL=`${environment.base}/api/users`;
    private http=inject(HttpClient)

    getuserbyusername(username:String):Observable<userlistDTO[]>{
        const url = `${this.apiURL}/username/${username}`;
        return this.http.get<userlistDTO[]>(url)
    }
}