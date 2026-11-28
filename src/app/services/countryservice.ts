
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, concat, of, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CountryDTO } from '../models/CountryDTO';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Countryservice {

  private apiURL = `${environment.base}/api/countries`;
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private readonly cacheKey = 'mikhuapp_countries';

  getcountries(): Observable<CountryDTO[]> {

    const paisesGuardados = this.obtenerPaisesCache();

    const peticion = this.http.get<CountryDTO[]>(this.apiURL).pipe(
      tap(data => this.guardarPaisesCache(data))
    );

    if (paisesGuardados) {
      return concat(
        of(paisesGuardados),
        peticion.pipe(
          catchError(error => {
            console.error('Error al actualizar países:', error);
            return EMPTY;
          })
        )
      );
    }

    return peticion;
  }

  private obtenerPaisesCache(): CountryDTO[] | null {

    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const datos = sessionStorage.getItem(this.cacheKey);

      return datos ? JSON.parse(datos) as CountryDTO[] : null;

    } catch (error) {
      console.error('Error al leer caché de países:', error);
      return null;
    }
  }

  private guardarPaisesCache(paises: CountryDTO[]): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      sessionStorage.setItem(this.cacheKey, JSON.stringify(paises));

    } catch (error) {
      console.error('Error al guardar caché de países:', error);
    }
  }

  insertcountry(dto: CountryDTO): Observable<CountryDTO> {
    return this.http.post<CountryDTO>(this.apiURL, dto);
  }

  deletecountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  listId(id: number): Observable<CountryDTO> {
    return this.http.get<CountryDTO>(`${this.apiURL}/${id}`);
  }

  updatecountry(dto: CountryDTO): Observable<CountryDTO> {
    return this.http.put<CountryDTO>(this.apiURL, dto);
  }
}
