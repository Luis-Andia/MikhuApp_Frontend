import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Consumptionservice } from '../../../services/consumptionservice';
import { Loginservice } from '../../../services/loginservice';
import { Userservice } from '../../../services/userservice';
import { MatDialog } from '@angular/material/dialog';
import { HistorialConsumoResponseDTO } from '../../../models/HistorialConsumoResponseDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatTableModule, MatIconModule, RouterLink, MatPaginatorModule, MatButtonModule],
  selector: 'app-cslistusercomponent',
  styleUrl: './cslistusercomponent.css',
  templateUrl: './cslistusercomponent.html',
})
export class Cslistusercomponent implements OnInit{
  
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4']
  dataSource = new MatTableDataSource<HistorialConsumoResponseDTO>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator

  private cS = inject(Consumptionservice)
  private lS = inject(Loginservice)
  private uS = inject(Userservice)
  private cdr = inject(ChangeDetectorRef)
  private loginService = inject(Loginservice)


  ngOnInit(): void {
    this.obtenerconsumos()
    this.modificartabla()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  get username(): string {
    return this.lS.getUsername();
  }

  obtenerconsumos(){
    if (!this.username) {
      console.log('No hay un usuario sesión activa');
      return;
    }

    // Obtener usuario por su username
    this.uS.getuserbyusername(this.username).subscribe({
      next:(data:any) =>{
        const idFamily = data.idFamily // Obtener familia del usuario
      
      if (idFamily) {
        this.cS.getconsumptionsbyFamily(idFamily).subscribe({ // Buscar los items de la familia del usuario
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

  eliminarConsumo(id: number) {
    this.cS.deleteconsumption(id).subscribe({
      next: () => {
        this.obtenerconsumos()
        this.cdr.detectChanges()
      }, error: (err) => {
        console.log('Error al eliminar!!')
        this.cdr.detectChanges()
      },
    })
  }

  // Comprobar si es moderador de una familia
  get esModerador(): boolean {
    return this.loginService.hasAnyRole(['MODERATOR']);
  }

  modificartabla(){
    if(this.esModerador){
      this.displayedColumns = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']
    }
  }
}
