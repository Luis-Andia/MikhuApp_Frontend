
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-registrocomponent',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registrocomponent.html',
  styleUrl: './registrocomponent.css'
})
export class Registrocomponent {

  formulario: any;
  mensajeError = '';
  mensajeInfo = '';
  hide = true;

  paises = [
    'Perú',
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'México',
    'Paraguay',
    'Uruguay',
    'Venezuela',
    'Estados Unidos',
    'España'
  ];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(13), Validators.max(120)]],
      pais: ['Perú', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      aceptarTerminos: [false, Validators.requiredTrue]
    });
  }

  clickEvent(): void {
    this.hide = !this.hide;
  }

  registrar(): void {
    this.mensajeError = '';
    this.mensajeInfo = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError =
        'Completa correctamente todos los campos y acepta los términos y condiciones.';
      return;
    }

    // Pendiente: conectar con el servicio real de registro del backend.
    this.mensajeInfo =
      'Tus datos son válidos. Falta conectar el registro con el servidor.';
  }
}
