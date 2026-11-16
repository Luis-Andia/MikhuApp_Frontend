import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginrequestDTO } from '../models/loginrequestDTO';

@Service()
export class Loginservice {
    private apiURL=`${environment.base}/api/items`;
    private http=inject(HttpClient)

    postlogin(dto:loginrequestDTO):Observable<loginrequestDTO> {
        return this.http.post<loginrequestDTO>(this.apiURL, dto);
    }
}
