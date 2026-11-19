import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roleservice } from '../../../services/roleservice';
import { RoleDTO } from '../../../models/RoleDTO';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-rupdatecomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rupdatecomponent.html',
  styleUrl: './rupdatecomponent.css'
})
export class Rupdatecomponent implements OnInit {

  formulario: any;
  idRol!: number;
  cargando = false;
  actualizando = false;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private rS: Roleservice,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      rol: ['', [Validators.required, Validators.maxLength(30)]],
      idUser: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.idRol = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarRol();
  }

  buscarRol(): void {
    this.cargando = true;
    this.error = '';

    this.rS.listId(this.idRol)
      .pipe(
        finalize(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data: RoleDTO) => {
          this.formulario.patchValue({
            rol: data.rol,
            idUser: data.idUser
          });

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al buscar rol:', err);
          this.error = 'No se pudo cargar la información del rol.';
          this.cdr.detectChanges();
        }
      });
  }

  actualizarRol(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error = 'Completa correctamente todos los campos.';
      return;
    }

    const dto: RoleDTO = {
      idRol: this.idRol,
      rol: this.formulario.value.rol.trim(),
      idUser: Number(this.formulario.value.idUser)
    };

    this.actualizando = true;
    this.error = '';
    this.mensaje = '';

    this.rS.updateRole(dto)
      .pipe(
        finalize(() => {
          this.actualizando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.mensaje = 'Rol actualizado correctamente.';
          this.cdr.detectChanges();

          setTimeout(() => {
            this.router.navigate(['/roles']);
          }, 1000);
        },
        error: (err) => {
          console.error('Error al actualizar rol:', err);
          this.error = 'No se pudo actualizar el rol. Verifica los datos y permisos.';
          this.cdr.detectChanges();
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/roles']);
  }
}