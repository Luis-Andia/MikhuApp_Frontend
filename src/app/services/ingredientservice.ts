import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class Ingredientservice {
    private apiURL='http://localhost:8080/api/ingredients';
    
    private http=inject(HttpClient)
    
    getIngredient():Observable<unknown> {
        const url = `${this.apiURL}`;
        return this.http.get(url)
    }
}
