import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Countryservice } from '../../../services/countryservice';
import { CountryDTO } from '../../../models/CountryDTO';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIconModule, MatTableModule, RouterLink],
  selector: 'app-colistcomponent',
  styleUrl: './colistcomponent.css',
  templateUrl: './colistcomponent.html',
})
export class Colistcomponent implements OnInit {
    displayedColumns:string[]=['C1', 'C2', 'C3', 'C4', 'C5']
    dataSource:CountryDTO[]=[]

    constructor(private coS:Countryservice, private cdr:ChangeDetectorRef){}

    ngOnInit():void{
      this.obtenerPaises()
    }

    // HU65: LISTAR PAISES
    obtenerPaises(){
        this.coS.getcountries().subscribe({
          next:data => {
            this.dataSource = data
            this.cdr.detectChanges()
          }, error(err) {
            console.log('Ocurrio un error al listar los paises')
          }
        })
    }

    // HU67: ELIMINAR PAIS
    eliminarpais(id:number){
      this.coS.deletecountry(id).subscribe({
        next:()=>{
          this.obtenerPaises()
          this.cdr.detectChanges()
        }, error(err){
          console.log('Ocurrio un error al eliminar el pais')
        }
      })
    }
}