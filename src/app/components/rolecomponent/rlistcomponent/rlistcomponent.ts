
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { RoleDTO } from '../../../models/RoleDTO';
import { Roleservice } from '../../../services/roleservice';

@Component({
  selector: 'app-rlistcomponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rlistcomponent.html',
  styleUrl: './rlistcomponent.css'
})
export class Rlistcomponent implements OnInit {

  listaRoles: RoleDTO[] = [];
  mensaje: string = '';
  cargando: boolean = false;
  eliminandoId: number | null = null;

  constructor(
    private rS: Roleservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarRoles();
  }

  listarRoles(): void {
    this.cargando = true;
    this.mensaje = '';
    this.cdr.detectChanges();

    this.rS.listarRoles()
      .pipe(
        finalize(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.listaRoles = data;

          if (data.length === 0) {
            this.mensaje = 'No hay roles registrados.';
          }
        },
        error: (error) => {
          console.error('Error al listar roles:', error);
          this.mensaje = 'No se pudieron cargar los roles.';
          this.listaRoles = [];
        }
      });
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

    this.rS.eliminarRol(rol.idRol)
      .pipe(
        finalize(() => {
          this.eliminandoId = null;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.listaRoles = this.listaRoles.filter(
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
