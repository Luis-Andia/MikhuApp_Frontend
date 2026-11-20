import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemDTO } from '../../../models/ItemDTO';
import { Itemservice } from '../../../services/itemservice';
import { inject } from '@angular/core';
import { Userservice } from '../../../services/userservice';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Loginservice } from '../../../services/loginservice';
import { Ilistusercomponent } from '../ilistusercomponent/ilistusercomponent';


@Component({
  imports: [MatTableModule, MatTableModule, MatIconModule, RouterLink, MatPaginator, MatPaginatorModule, MatButtonModule, Ilistusercomponent],
  selector: 'app-itlistcomponent',
  styleUrl: './itlistcomponent.css',
  templateUrl: './itlistcomponent.html',
})

export class Itlistcomponent implements OnInit{
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4','C5', 'C6', 'C7', 'C8', 'C9']
  dataSource = new MatTableDataSource<ItemDTO>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator

  private iS = inject(Itemservice)
  private cdr = inject(ChangeDetectorRef)
  private loginService = inject(Loginservice)

  ngOnInit(): void {
    this.obtenerItems()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  obtenerItems() {
        this.iS.getItems().subscribe({ // Buscar los items de la familia del usuario
        next: data => {
          this.dataSource.data = data;
          this.cdr.detectChanges();
        },
        error:err => {
          console.log('Ocurrió un error al listar los ítems de la familia');
          this.cdr.detectChanges();
        }
        });
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

  // Roles
  // Comprobar si es administrador
  get esAdmin(): boolean {
    return this.loginService.hasAnyRole(['ADMIN']);
  }

  // Comprobar si es miembro de familia
  get esMiembro(): boolean {
    return this.loginService.hasAnyRole(['MEMBER']);
  }

    // Comprobar si es invitado
  get esInvitado(): boolean {
    return this.loginService.hasAnyRole(['GUEST']);
  }
 
  // Comprobar si es moderador de una familia
  get esModerador(): boolean {
    return this.loginService.hasAnyRole(['MODERATOR']);
  }
}
