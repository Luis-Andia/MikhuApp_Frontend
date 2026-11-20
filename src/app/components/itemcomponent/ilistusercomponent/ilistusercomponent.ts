import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Itemservice } from '../../../services/itemservice';
import { inject } from '@angular/core';
import { Userservice } from '../../../services/userservice';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FamilyInventoryDTO } from '../../../models/FamilyInventoryDTO';
import { Recommendationiacomponent } from '../../recommendationiacomponent/recommendationiacomponent';
import { Loginservice } from '../../../services/loginservice';


@Component({
  imports: [MatTableModule, MatTableModule,MatIconModule, RouterLink, MatPaginator, MatPaginatorModule, MatButtonModule],
  selector: 'app-ilistusercomponent',
  styleUrl: './ilistusercomponent.css',
  templateUrl: './ilistusercomponent.html',
})

export class Ilistusercomponent implements OnInit {
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4','C5', 'C6', 'C7', 'C8']
  dataSource = new MatTableDataSource<FamilyInventoryDTO>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator

  private iS = inject(Itemservice)
  private lS = inject(Loginservice)
  private uS = inject(Userservice)
  private cdr = inject(ChangeDetectorRef)
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.obtenerItems()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  get username(): string {
    return this.lS.getUsername();
  }

  obtenerItems() {

    if (!this.username) {
      console.log('No hay un usuario sesión activa');
      return;
    }

    // Obtener usuario por su username
    this.uS.getuserbyusername(this.username).subscribe({
      next:(data:any) =>{
        const idFamily = data.idFamily // Obtener familia del usuario
      
      if (idFamily) {
        this.iS.getItemsFamily(idFamily).subscribe({ // Buscar los items de la familia del usuario
        next: data => {
          this.dataSource.data = data;
          this.cdr.detectChanges();
        },
        error:err => {
          console.log('Ocurrió un error al listar los ítems de la familia');
          this.cdr.detectChanges();
        }
        });
        } else {
            console.log('El usuario no tiene una familia asociada');
          }
        },
        error(err) {
          console.log('Error al obtener la información del usuario logueado');
        }
      })
  }

  eliminarItem(id: number) {
    this.iS.deleteItem(id).subscribe({
      next: () => {
        this.obtenerItems()
        this.cdr.detectChanges()
      }, error: (err) => {
        console.log('Error al eliminar!!')
        this.cdr.detectChanges()
      },
    })
  }

  abrirRecomendaciones() {
  this.dialog.open(Recommendationiacomponent, {
    data: this.dataSource.data,
    width: '520px',
  });
  }
}