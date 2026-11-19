import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ConsumptionDTO } from '../../../models/ConsumptionDTO';
import { Consumptionservice } from '../../../services/consumptionservice';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MatIconModule,
    MatTableModule,
  ],
  selector: 'app-cslistcomponent',
  styleUrl: './cslistcomponent.css',
  templateUrl: './cslistcomponent.html',
})
export class Cslistcomponent implements OnInit{

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4','C5']
  dataSource: ConsumptionDTO[] = []

  private csS = inject(Consumptionservice)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.obtenerConsumos()
  }

  obtenerConsumos() {
    this.csS.getconsumption().subscribe({
      next: data => {
        this.dataSource = data
        this.cdr.detectChanges()
      }, error: err => {
        console.log('Ocurrió un error al listar los registros!!')
        this.cdr.detectChanges()
      },
    })
  }

  eliminarConsumos(id: number) {
    this.csS.deleteconsumption(id).subscribe({
      next: () => {
        this.obtenerConsumos()
        this.cdr.detectChanges()
      }, error: err => {
        console.log('Error al eliminar!!')
        this.cdr.detectChanges()
      }
    })
  }

  


}
