import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FamilyDTO } from '../../../models/FamilyDTO';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIconModule, MatTableModule, RouterLink],
  selector: 'app-flistcomponent',
  styleUrl: './flistcomponent.css',
  templateUrl: './flistcomponent.html',
})
export class Flistcomponent implements OnInit {
    displayedColumns:string[]=['C1', 'C2', 'C3', 'C4']
    dataSource:FamilyDTO[]=[]

    constructor(private fS:Familyservice, private cdr:ChangeDetectorRef){}

    ngOnInit():void{
      this.obtenerFamilias()
    }

    obtenerFamilias(){
        this.fS.getfamilies().subscribe({
          next:data => {
            this.dataSource = data
            this.cdr.detectChanges()
          }, error(err) {
            console.log('Ocurrio un error al listar las familias')    
          }
        })
    }

    eliminarfamilia(id:number){
      this.fS.deletefamily(id).subscribe({
        next:()=>{
          this.obtenerFamilias()
          this.cdr.detectChanges()
        }, error(err){
          console.log('Ocurrio un error al eliminar la familia')    
        }
      })

    }
}
