import { ChangeDetectorRef, Component } from '@angular/core';
import { Loginservice } from '../../services/loginservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { loginrequestDTO } from '../../models/loginrequestDTO';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  selector: 'app-logincomponent',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css'
  styleUrl: './logincomponent.css'
})
export class Logincomponent {

  formulario: any;
  mensajeError = '';
  mensajeInfo = '';
  hide = true;

  constructor(
    private readonly auth: Loginservice,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route:ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  clickEvent(event: MouseEvent): void {
  clickEvent(event: MouseEvent): void {
    event.stopPropagation();
    this.hide = !this.hide;
    this.hide = !this.hide;
  }

  iniciarSesion(): void {
    this.mensajeError = '';

  iniciarSesion(): void {
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.formulario.markAllAsTouched();
      this.mensajeError = 'Ingresa tu usuario y contraseña';
      return;
    }

    const dto: loginrequestDTO = {
      username: this.formulario.value.username,
      password: this.formulario.value.contrasena
    };

    this.lS.postlogin(dto).subscribe({
      next: data => {
        console.log('Inicio de sesión correcto:', data);

        this.mensajeError = '';
        this.mensajeInfo = 'Sesión iniciada correctamente';
        this.cdr.detectChanges();

        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Error al iniciar sesión:', err);

        this.mensajeError = 'Usuario o contraseña incorrectos';
        this.mensajeInfo = '';

        this.cdr.detectChanges();
      }
    });
  }
}