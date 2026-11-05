import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { IngredientDTO } from '../../../models/IngredientDTO';
import { Ingredientservice } from '../../../services/ingredientservice';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIconModule, MatTableModule, RouterLink],
  selector: 'app-ilistcomponent',
  styleUrl: './ilistcomponent.css',
  templateUrl: './ilistcomponent.html',
})
export class Ilistcomponent implements OnInit {
  displayedColumns:string[]=['C1', 'C2', 'C3', 'C4']
  dataSource:IngredientDTO[]=[]
  
  constructor(private iS: Ingredientservice, private cdr: ChangeDetectorRef){}

  ngOnInit():void {
    this.obteneringredientes()
  }

  obteneringredientes(){
    this.iS.getIngredient().subscribe({
      next:data => {
        this.dataSource = data
        this.cdr.detectChanges()
      }, error(err){
        console.log("Ocurrio un erro al listar los ingredientes")
      }
    })
  }

  eliminaringredient(id:number){ 
    this.iS.deleteIngredient(id).subscribe({
        next:()=>{
          this.obteneringredientes()
          this.cdr.detectChanges()
        }, error(err){
          console.log('Ocurrio un error al eliminar el ingrediente')    
        }
      })
  }
}
