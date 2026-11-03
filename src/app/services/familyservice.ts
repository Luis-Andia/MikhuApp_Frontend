import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { FamilyDTO } from '../models/FamilyDTO';
import { environment } from '../../environments/environment.development';

@Service()
export class Familyservice {
    private apiURL=`${environment.base}/api/families`;
    private http=inject(HttpClient)

    getfamilies():Observable<FamilyDTO[]>{
        const url=`${this.apiURL}`
        return this.http.get<FamilyDTO[]>(url)
    }

    insertfamily(dto:FamilyDTO):Observable<FamilyDTO>{
        const url=`${this.apiURL}`
        return this.http.post<FamilyDTO>(url,dto)
    }

    deletefamily(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    listId(id:number):Observable<FamilyDTO>{
        return this.http.get<FamilyDTO>(`${this.apiURL}/${id}`)
    }

    updatefamily(dto:FamilyDTO):Observable<FamilyDTO>{
        return this.http.put<FamilyDTO>(this.apiURL,dto)
    }
}
