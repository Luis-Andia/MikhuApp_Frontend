import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Service()
export class Itemservice {
    private apiURL=`${environment.base}/api/ingredients`;
    private http=inject(HttpClient)
    
    //
    // getItemsFamily(idFamily:number):Observable<any> { 
        // const url = `${this.apiURL}/familia/${idFamily}`;
        // return this.http.get(url)
    // }
    ///
}
