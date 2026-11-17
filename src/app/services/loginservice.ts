import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginresponseDTO } from '../models/loginresponseDTO';
import { loginrequestDTO } from '../models/loginrequestDTO';

@Service()
export class Loginservice {
    private apiURL=`${environment.base}/api/items`;
    private http=inject(HttpClient)

    postlogin(dto:loginrequestDTO):Observable<loginresponseDTO> {
        return this.http.post<loginresponseDTO>(this.apiURL, dto);
    }
}
