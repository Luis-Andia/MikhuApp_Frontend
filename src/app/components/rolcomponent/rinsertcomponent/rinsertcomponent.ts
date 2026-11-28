
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roleservice } from '../../../services/roleservice';
import { RoleDTO } from '../../../models/RoleDTO';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rinsertcomponent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './rinsertcomponent.html',
  styleUrl: './rinsertcomponent.css'
})
export class Rinsertcomponent {
  formulario: any;
  mensaje = '';
  error = '';
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private rS: Roleservice,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      rol: ['', [Validators.required, Validators.maxLength(30)]],
      idUser: [null, [Validators.required, Validators.min(1)]]
    });
  }

  registrarRol(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error = 'Completa correctamente todos los campos.';
      return;
    }

    const dto: RoleDTO = {
      rol: this.formulario.value.rol.trim(),
      idUser: Number(this.formulario.value.idUser)
    };

    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.rS.insertRole(dto).subscribe({
      next: () => {
        this.mensaje = 'Rol registrado correctamente.';
        this.guardando = false;

        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 1000);
      },
      error: (err) => {
        console.error('Error al registrar rol:', err);
        this.error = 'No se pudo registrar el rol. Verifica los datos y permisos.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/roles']);
  }
}
