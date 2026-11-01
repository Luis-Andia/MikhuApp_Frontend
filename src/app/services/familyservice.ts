import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilyDTO } from '../models/FamilyDTO';

@Service()
export class Familyservice {
    private apiURL = 'http://localhost:8080/api/families'
    private http=inject(HttpClient)

    postfamily(family:FamilyDTO):Observable<any>{
        const url=`${this.apiURL}`
        return this.http.post(url,family)
    }

    getfamilies():Observable<FamilyDTO[]>{
        const url=`${this.apiURL}`
        return this.http.get<FamilyDTO[]>(url)
    }

    deletefamily(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }
}
