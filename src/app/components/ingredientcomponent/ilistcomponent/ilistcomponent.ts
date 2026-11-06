import { ChangeDetectorRef,Component, OnInit, ViewChild } from '@angular/core';
import { IngredientDTO } from '../../../models/IngredientDTO';
import { Ingredientservice } from '../../../services/ingredientservice';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  imports: [MatIconModule, MatTableModule, RouterLink, MatPaginatorModule],
  selector: 'app-ilistcomponent',
  styleUrl: './ilistcomponent.css',
  templateUrl: './ilistcomponent.html',
})
export class Ilistcomponent implements OnInit {
  displayedColumns:string[]=['C1', 'C2', 'C3', 'C4']
  dataSource = new MatTableDataSource<IngredientDTO>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator
  
  constructor(private iS: Ingredientservice, private cdr: ChangeDetectorRef){}

  ngOnInit():void {
    this.obteneringredientes()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  obteneringredientes(){
    this.iS.getIngredient().subscribe({
      next:data => {
        this.dataSource.data = data
        this.cdr.detectChanges()
      }, error:err=>{
        console.log("Ocurrio un error al listar los ingredientes")
      }
    })
  }

  eliminaringredient(id:number){ 
    this.iS.deleteIngredient(id).subscribe({
        next:()=>{
          this.obteneringredientes()
          this.cdr.detectChanges()
        }, error:err=>{
          console.log('Ocurrio un error al eliminar el ingrediente')    
        }
      })
  }
}
