import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ItemDTO } from '../models/ItemDTO';
import { Injectable } from '@angular/core';
import { FamilyInventoryDTO } from '../models/FamilyInventoryDTO';
import { MostConsumedIngredientsDTO } from '../models/MostConsumedIngredientsDTO';
import { LowStockItemsDTO } from '../models/LowStockItemsDTO';
import { NearExpirationDTO } from '../models/NearExpirationDTO';
import { ExpiredDTO } from '../models/ExpiredDTO';
import { IngredienteAVailableByFamilyDTO } from '../models/IngredientAvailableByFamilyDTO';

@Injectable({
  providedIn: 'root' // <-- El servicio va aquí
})
export class Itemservice {
    private apiURL=`${environment.base}/api/items`;
    private http=inject(HttpClient)
    

    getItemsFamily(idFamily:number):Observable<FamilyInventoryDTO[]> { 
        const url = `${this.apiURL}/familia/${idFamily}`;
        return this.http.get<FamilyInventoryDTO[]>(url)
    }
    
    getItems(): Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(this.apiURL)
    }

    deleteItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    insert(it: ItemDTO): Observable<ItemDTO> {
    return this.http.post<ItemDTO>(this.apiURL, it)
    }

    update(id: number, dto: ItemDTO): Observable<ItemDTO> {
    return this.http.put<ItemDTO>(`${this.apiURL}/${id}`, dto);
    }

    listId(id: number): Observable<ItemDTO> {
    return this.http.get<ItemDTO>(`${this.apiURL}/${id}`);
    }

    getItembyName(nameItem:string):Observable<ItemDTO[]>{ // Va a cambiar, por 
        return this.http.get<ItemDTO[]>(`${this.apiURL}/buscarPorNombre/${nameItem}`)
    }

    getlowStockitems(idFamily: number): Observable<LowStockItemsDTO[]>{
        return this.http.get<LowStockItemsDTO[]>(`${this.apiURL}/bajoStock/${idFamily}`)
    }

    getNearExpiration(idFamily: number): Observable<NearExpirationDTO[]>{
        return this.http.get<NearExpirationDTO[]>(`${this.apiURL}/ProximosVencer/${idFamily}`) 
    }

    getExpired(idFamily: number): Observable<ExpiredDTO[]>{
        return this.http.get<ExpiredDTO[]>(`${this.apiURL}/Vencidos/${idFamily}`) 
    }

    getIngredientAvailable(idFamily: number): Observable<IngredienteAVailableByFamilyDTO[]> {
        return this.http.get<IngredienteAVailableByFamilyDTO[]>(`${this.apiURL}/CantidadIngredientesDisponibles/${idFamily}`) 
    }

}
