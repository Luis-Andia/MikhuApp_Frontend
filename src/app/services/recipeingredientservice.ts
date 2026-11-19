
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RecipeIngredientDTO } from '../models/RecipeIngredientDTO';

@Injectable({
  providedIn: 'root'
})
export class Recipeingredientservice {

  private apiURL = `${environment.base}/api/recipeingredients`;
  private http = inject(HttpClient);

  getByRecipe(recipeId: number): Observable<RecipeIngredientDTO[]> {
    return this.http.get<RecipeIngredientDTO[]>(
      `${this.apiURL}/receta/${recipeId}`
    );
  }

  insert(dto: RecipeIngredientDTO): Observable<RecipeIngredientDTO> {
    return this.http.post<RecipeIngredientDTO>(this.apiURL, dto);
  }

  update(dto: RecipeIngredientDTO): Observable<RecipeIngredientDTO> {
    return this.http.put<RecipeIngredientDTO>(this.apiURL, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
