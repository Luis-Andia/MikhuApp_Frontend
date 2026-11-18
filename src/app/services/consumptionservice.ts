import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ConsumptionDTO } from '../models/ConsumptionDTO';
import { Cons, Observable } from 'rxjs';
import { MostConsumedIngredientsDTO } from '../models/MostConsumedIngredientsDTO';

@Service()
export class Consumptionservice {
  private apiURL = `${environment.base}/api/consumptions`;
  private http = inject(HttpClient);

  getconsumption(): Observable<ConsumptionDTO[]> {
    return this.http.get<ConsumptionDTO[]>(this.apiURL);
  }

  deleteconsumption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  insertconsumption(dto: ConsumptionDTO): Observable<ConsumptionDTO> {
    return this.http.post<ConsumptionDTO>(this.apiURL, dto);
  }
  listId(id: number): Observable<ConsumptionDTO> {
    return this.http.get<ConsumptionDTO>(`${this.apiURL}/${id}`);
  }
  update(dto: ConsumptionDTO): Observable<ConsumptionDTO> {
    return this.http.put<ConsumptionDTO>(this.apiURL, dto);
  }

  MostConsumedIngredientsByFamily(id: number):Observable<MostConsumedIngredientsDTO[]>{
    return this.http.get<MostConsumedIngredientsDTO[]>(`${this.apiURL}/alimentos-mas-consumidos/${id}`)
    }

}
