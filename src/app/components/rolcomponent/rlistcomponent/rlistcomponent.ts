
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { RoleDTO } from '../../../models/RoleDTO';
import { Roleservice } from '../../../services/roleservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Menuadmincomponent } from '../../menuadmincomponent/menuadmincomponent';

@Component({
  selector: 'app-rlistcomponent',
  standalone: true,
  imports: [ MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './rlistcomponent.html',
  styleUrl: './rlistcomponent.css'
})

export class Rlistcomponent implements OnInit {

  dataSource = new MatTableDataSource<RoleDTO>([]);
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4'];
  mensaje: string = '';
  eliminandoId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(
    private rS: Roleservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  listarRoles(): void {
    this.mensaje = '';
    this.cdr.detectChanges();

    this.rS.getRoles()
      .pipe(
        finalize(() => {
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;

          if (data.length === 0) {
            this.mensaje = 'No hay roles registrados.';
          }
        },
        error: (error) => {
          console.error('Error al listar roles:', error);
          this.mensaje = 'No se pudieron cargar los roles.';
          this.dataSource.data = [];
        }
      });
  }

  esProtegido(rol: RoleDTO): boolean {
    return rol.idRol === 1 || rol.rol === 'ROLE_ADMIN';
  }

  eliminarRol(rol: RoleDTO): void {

    if (rol.idRol === 1 || rol.rol === 'ROLE_ADMIN') {
      this.mensaje = 'El rol administrador no se puede eliminar.';
      return;
    }

    if (rol.idRol == null) {
      this.mensaje = 'No se pudo identificar el rol seleccionado.';
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar el rol ${rol.rol}?`
    );

    if (!confirmar) {
      return;
    }

    this.eliminandoId = rol.idRol;
    this.mensaje = '';

    this.rS.deleteRole(rol.idRol)
      .pipe(
        finalize(() => {
          this.eliminandoId = null;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            item => item.idRol !== rol.idRol
          );

          this.mensaje = `El rol ${rol.rol} fue eliminado correctamente.`;

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al eliminar rol:', error);
          this.mensaje = 'No se pudo eliminar el rol. Verifica si tiene restricciones o dependencias.';
          this.cdr.detectChanges();
        }
      });
  }
}
