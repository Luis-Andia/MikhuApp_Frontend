import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RecipeDTO } from '../models/RecipeDTO';

@Service()
export class Recipeservice {
    private apiURL=`${environment.base}/api/recipes`;
    private http=inject(HttpClient)

    getRecipes():Observable<RecipeDTO[]> {
            const url = `${this.apiURL}`;
            return this.http.get<RecipeDTO[]>(url)
        }
}
