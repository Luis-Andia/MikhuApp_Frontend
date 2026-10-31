import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class Recipeservice {
    private apiURL='http://localhost:8080/api/recipes';
    private http=inject(HttpClient)

    getRecipes():Observable<any> {
            const url = `${this.apiURL}`;
            return this.http.get(url)
        }
}
