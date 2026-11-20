import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { Userservice } from '../../../services/userservice';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Loginservice } from '../../../services/loginservice';
import { ConsumptionDTO } from '../../../models/ConsumptionDTO';
import { Consumptionservice } from '../../../services/consumptionservice';


@Component({
  imports: [
    MatIconModule,
    MatTableModule,
    RouterLink,
    MatPaginator,
    MatPaginatorModule
  ],
  selector: 'app-cslistcomponent',
  styleUrl: './cslistcomponent.css',
  templateUrl: './cslistcomponent.html',
})
export class Cslistcomponent implements OnInit{

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4','C5', 'C6']
  dataSource = new MatTableDataSource<ConsumptionDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private csS = inject(Consumptionservice)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.obtenerConsumos()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerConsumos() {
    this.csS.getconsumption().subscribe({
      next: data => {
        this.dataSource.data = data
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
