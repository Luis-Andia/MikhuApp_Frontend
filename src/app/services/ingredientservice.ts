import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientDTO } from '../models/IngredientDTO';
import { environment } from '../../environments/environment.development';

@Service()
export class Ingredientservice {
    private apiURL=`${environment.base}/api/ingredients`;
    private http=inject(HttpClient)
    
    getIngredient():Observable<IngredientDTO[]> {
        const url = `${this.apiURL}`;
        return this.http.get<IngredientDTO[]>(url)
    }

    insertIngredient(dto: IngredientDTO):Observable<IngredientDTO>{
        const url = `${this.apiURL}`;
        return this.http.post<IngredientDTO>(url, dto)
    }

    deleteIngredient(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    listId(id:number):Observable<IngredientDTO>{
        return this.http.get<IngredientDTO>(`${this.apiURL}/${id}`)
    }

    updateingredient(dto:IngredientDTO):Observable<IngredientDTO> {
        return this.http.put<IngredientDTO>(this.apiURL, dto)
    }
}
