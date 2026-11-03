import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientDTO } from '../models/IngredientDTO';

@Service()
export class Ingredientservice {
    private apiURL='http://localhost:8080/api/ingredients';
    
    private http=inject(HttpClient)
    
    getIngredient():Observable<IngredientDTO[]> {
        const url = `${this.apiURL}`;
        return this.http.get<IngredientDTO[]>(url)
    }

    postIngredient(ingredient: IngredientDTO):Observable<any>{
        const url = `${this.apiURL}`;
        return this.http.post(url, ingredient)
    }

    deleteIngredient(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }
}
