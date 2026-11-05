import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ItemDTO } from '../models/ItemDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // <-- El servicio va aquí
})
export class Itemservice {
    private apiURL=`${environment.base}/api/items`;
    private http=inject(HttpClient)
    
    //
    // getItemsFamily(idFamily:number):Observable<any> { 
        // const url = `${this.apiURL}/familia/${idFamily}`;
        // return this.http.get(url)
    // }
    ///

    getItems(): Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(this.apiURL)
    }

    deleteItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

}
