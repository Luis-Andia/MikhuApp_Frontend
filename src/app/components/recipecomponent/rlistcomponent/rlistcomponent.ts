import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Recipeservice } from '../../../services/recipeservice';
import { RecipeDTO } from '../../../models/RecipeDTO';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountryDTO } from '../../../models/CountryDTO';
import { Countryservice } from '../../../services/countryservice';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  imports: [FormsModule, RouterLink, MatCardModule, MatIconModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule],
  selector: 'app-rlistcomponent',
  styleUrl: './rlistcomponent.css',
  templateUrl: './rlistcomponent.html',
})
export class Rlistcomponent implements OnInit {
  displayedColumns:string[]=['C1', 'C2', 'C3', 'C4']
  dataSource:RecipeDTO[]=[]
  recetasPagina:RecipeDTO[]=[]
  
  // Paginación
  pageIndex: number = 0
  pageSize: number = 5

  // Filtros
  busqueda: string = ''
  paisSeleccionado: string = ''
  ingredienteBuscado: string = ''

  paises: CountryDTO[] = []
  
  constructor(private rS:Recipeservice, private cS: Countryservice, private cdr:ChangeDetectorRef){}

  ngOnInit():void {
    this.obtenerRecetas()
    this.obtenerPaises()
  }

  obtenerPaises(){
    this.cS.getcountries().subscribe({
      next: (data) => {
        this.paises = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error al listar los países');
      }
    });
  }

  obtenerRecetas(){
    this.rS.getRecipes().subscribe({
      next:data => {
        this.mostrarRecetas(data)
        this.cdr.detectChanges();
      }, error:(err) =>{
        console.log('Ocurrio un error al listar las recetas')        
      },
    })
  }

  obtenerRecetasPorNombre(name: string) {
    this.rS.getRecipesbyName(name).subscribe({
      next: (data) => {
        this.mostrarRecetas(data)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrio un error al buscar recetas por nombre');
      }
    });
  }

  obtenerRecetasPorPais(pais: string) {
    this.rS.getRecipesbyCountry(pais).subscribe({
      next: (data) => {
        this.mostrarRecetas(data)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrio un error al buscar recetas por país');
      }
    });
  }

    obtenerRecetasPorIngrediente(ingrediente: string) {
      this.rS.getRecipesbyIngrediente(ingrediente).subscribe({
        next: (data) => {
          this.mostrarRecetas(data)
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('Ocurrio un error al buscar recetas por ingrediente');
        }
      });
    }
  
  mostrarRecetas(data: RecipeDTO[]) {
    this.dataSource = data
    this.pageIndex = 0
    this.actualizarPagina()
  }

  actualizarPagina() {
    const inicio = this.pageIndex * this.pageSize
    this.recetasPagina = this.dataSource.slice(inicio, inicio + this.pageSize)
    this.cdr.detectChanges()
  }

  cambiarPagina(e: PageEvent) {
    this.pageIndex = e.pageIndex
    this.pageSize = e.pageSize
    this.actualizarPagina()
  }

  aplicarFiltros() {
    const ing = this.ingredienteBuscado.trim()
    const pais = this.paisSeleccionado
    const nombre = this.busqueda.trim()
    
    this.dataSource = []

    if (ing) {
      this.obtenerRecetasPorIngrediente(ing)
    } else if (pais) {
      this.obtenerRecetasPorPais(pais)
    } else if (nombre) {
      this.obtenerRecetasPorNombre(nombre)
    } else {
      this.obtenerRecetas()
    }
  }

  limpiarFiltros() {
    this.busqueda = ''
    this.paisSeleccionado = ''
    this.ingredienteBuscado = ''
    this.obtenerRecetas()
  }

  get hayFiltros(): boolean {
    return !!(this.busqueda.trim() || this.paisSeleccionado || this.ingredienteBuscado.trim())
  }

}
