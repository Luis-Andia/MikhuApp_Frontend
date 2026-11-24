import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Recipeservice } from '../../../services/recipeservice';
import { Countryservice } from '../../../services/countryservice';
import { RecipeDTO } from '../../../models/RecipeDTO';
import { CountryDTO } from '../../../models/CountryDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  imports: [MatIconModule, MatTableModule, RouterLink, MatPaginatorModule],
  selector: 'app-relistcomponent',
  styleUrl: './relistcomponent.css',
  templateUrl: './relistcomponent.html',
})
export class Relistcomponent implements OnInit {
  displayedColumns:string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']
  dataSource=new MatTableDataSource<RecipeDTO>([])
  paises:CountryDTO[] = []
  mensaje:string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private reS:Recipeservice, private coS:Countryservice, private cdr:ChangeDetectorRef){}

  ngOnInit():void {
    this.obtenerPaises()
    this.obtenerRecetas()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }


  // HU83: LISTAR RECETAS
  obtenerRecetas(){
    this.reS.getRecipes().subscribe({
      next:data => {
        this.dataSource.data = data
        this.cdr.detectChanges()
      }, error:err => {
        console.log('Ocurrio un error al listar las recetas')
      }
    })
  }

  // Carga los países para mostrar su nombre en la tabla
  obtenerPaises(){
    this.coS.getcountries().subscribe({
      next:data => {
        this.paises = data
        this.cdr.detectChanges()
      }, error:err => {
        console.log('Ocurrio un error al listar los paises')
      }
    })
  }

  // Devuelve el nombre del país según su ID
  nombrePais(id:number):string {
    const pais = this.paises.find(p => p.idCountry === id)
    return pais ? pais.nomCountry : '-'
  }

  // HU85: ELIMINAR RECETA
  eliminarReceta(id:number){
    this.reS.deleteRecipe(id).subscribe({
      next:() => {
        this.mensaje = ''
        this.obtenerRecetas()
        this.cdr.detectChanges()
      }, error:err => {
        console.log('Ocurrio un error al eliminar la receta')
        this.mensaje = 'No se pudo eliminar la receta'
        this.cdr.detectChanges()
      }
    })
  }
}