import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDTO } from '../models/CountryDTO';
import { environment } from '../../environments/environment.development';

@Service()
export class Countryservice {
    private apiURL=`${environment.base}/api/countries`;
    private http=inject(HttpClient)

    getcountries():Observable<CountryDTO[]>{
        return this.http.get<CountryDTO[]>(this.apiURL)
    }

    insertcountry(dto:CountryDTO):Observable<CountryDTO>{
        return this.http.post<CountryDTO>(this.apiURL,dto)
    }

    deletecountry(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    listId(id:number):Observable<CountryDTO>{
        return this.http.get<CountryDTO>(`${this.apiURL}/${id}`)
    }

    updatecountry(dto:CountryDTO):Observable<CountryDTO>{
        return this.http.put<CountryDTO>(this.apiURL,dto)
    }
}