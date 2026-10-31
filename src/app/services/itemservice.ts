import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class Itemservice {
    private apiURL='http://localhost:8080/api/items';
    
    private http=inject(HttpClient)
    
    getItemsFamily(idFamily:number):Observable<any> {
        const url = `${this.apiURL}/familia/${idFamily}`;
        return this.http.get(url)
    }
}
