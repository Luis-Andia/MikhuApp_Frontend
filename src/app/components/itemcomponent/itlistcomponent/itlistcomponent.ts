import { ChangeDetectorRef, Component,Inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { ItemDTO } from '../../../models/ItemDTO';
import { Itemservice } from '../../../services/itemservice';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';


@Component({
  imports: [MatTableModule, MatTableModule,MatIconModule],
  selector: 'app-itlistcomponent',
  styleUrl: './itlistcomponent.css',
  templateUrl: './itlistcomponent.html',
})

export class Itlistcomponent implements OnInit{
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4','C5']
  dataSource: ItemDTO[] = []

  private iS = inject(Itemservice)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.obtenerItems()
  }

  obtenerItems() {
    this.iS.getItems().subscribe({
      next: (data: ItemDTO[]) => {
        this.dataSource = data
        this.cdr.detectChanges()
      }, error: (err: any) => {
        console.log('Ocurrió un error al listar los registros!!')
        this.cdr.detectChanges()
      },
    })
  }

  eliminarItem(id: number) {
    this.iS.deleteItem(id).subscribe({
      next: () => {
        this.obtenerItems()
        this.cdr.detectChanges()
      }, error: (err: any) => {
        console.log('Error al eliminar!!')
        this.cdr.detectChanges()
      },
    })


  }

}
