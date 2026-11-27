
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Countryservice } from '../../services/countryservice';
import { Userservice } from '../../services/userservice';

import { CountryDTO } from '../../models/CountryDTO';
import { UserRegisterDTO } from '../../models/UserRegisterDTO';

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
export class Registrocomponent implements OnInit {

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  formulario: any;
  mensajeError = '';
  mensajeInfo = '';
  hide = true;
  cargando = false;

  paises: CountryDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: Countryservice,
    private userService: Userservice
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(13), Validators.max(120)]],
      pais: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      aceptarTerminos: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.countryService.getcountries().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (error) => {
        console.error('Error al cargar los países:', error);
        this.mensajeError =
          'No se pudieron cargar los países. Intenta nuevamente.';
      }
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

    const datos = this.formulario.value;

    const dto: UserRegisterDTO = {
      firstName: datos.nombre.trim(),
      lastNameUser: datos.apellido.trim(),
      nomUser: datos.username.trim(),
      age: Number(datos.edad),
      email: datos.email.trim(),
      password: datos.contrasena,
      idCountry: Number(datos.pais)
    };

    this.cargando = true;

    this.userService.registerUser(dto).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado:', respuesta);

        this.mensajeInfo =
          '¡Tu cuenta fue creada correctamente! Ahora puedes iniciar sesión.';

        // Reinicia valores, validaciones y estado visual del formulario.
        this.formDirective.resetForm({
          nombre: '',
          apellido: '',
          edad: '',
          pais: '',
          username: '',
          email: '',
          contrasena: '',
          aceptarTerminos: false
        });

        this.hide = true;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);

        if (error.status === 409) {
          this.mensajeError =
            'Ese nombre de usuario ya está registrado. Elige otro.';
        } else if (error.status === 400) {
          this.mensajeError =
            'Verifica los datos ingresados. Algunos campos no son válidos.';
        } else {
          this.mensajeError =
            'No se pudo crear la cuenta. Intenta nuevamente.';
        }

        this.cargando = false;
      }
    });
  }
}
