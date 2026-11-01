import { ChangeDetectorRef, Component } from '@angular/core';
import { Recipeservice } from '../../../services/recipeservice';
import { RecipeDTO } from '../../../models/RecipeDTO';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  imports: [MatIconModule, MatTableModule],
  selector: 'app-rlistcomponent',
  styleUrl: './rlistcomponent.css',
  templateUrl: './rlistcomponent.html',
})
export class Rlistcomponent {
  displayedColumns:string[]=['C1', 'C2', 'C3', 'C4']
  dataSource:RecipeDTO[]=[]
  constructor(private rS:Recipeservice, private cdr:ChangeDetectorRef){}

  ngOnInit():void {
    this.obtenerRecetas()
  }

  obtenerRecetas(){
    this.rS.getRecipes().subscribe({
      next:data => {
        this.dataSource = data
        this.cdr.detectChanges()
      }, error(err) {
        console.log('Ocurrio un error al listar las recetas')        
      },
    })
  }

}
