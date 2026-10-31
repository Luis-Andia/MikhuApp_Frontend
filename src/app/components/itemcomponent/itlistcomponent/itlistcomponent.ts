import { Component } from '@angular/core';
import { Itemservice } from '../../../services/itemservice';
import { FamilyInventoryDTO } from '../../../models/FamiliyInventoryDTO';
import { Menucomponent } from '../../menucomponent/menucomponent';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  imports: [Menucomponent, MatIconModule, MatTableModule],
  selector: 'app-itlistcomponent',
  styleUrl: './itlistcomponent.css',
  templateUrl: './itlistcomponent.html',
})
export class Itlistcomponent {
  displayedColumns:string[]=['C1', 'C2', 'C3', 'C4', 'C5']
  dataSource:FamilyInventoryDTO[]=[]
  idFamily:number = 0
  mensaje:string = ''

  constructor(private itS:Itemservice){}

  ngOnInit():void {
    this.obtenerItems()
  }
  // Encontrar forma de como atrapar el id del usuario ----------------------
  obtenerItems():void{
    const id=Number(this.idFamily)
    if(!Number.isInteger(id) || id<1){
      this.mensaje = 'Ingrese un ID valido!'
      this.dataSource = []
      return
    }

    this.itS.getItemsFamily(id).subscribe({
      next:data => {
        this.dataSource = data
      }, error(err) {
        console.log('Ocurrio un errro al listar los registros')        
      },
    })
  }

}
