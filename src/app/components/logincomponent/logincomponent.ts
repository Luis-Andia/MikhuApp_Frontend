
import { ChangeDetectorRef, Component } from '@angular/core';
import { Loginservice } from '../../services/loginservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { loginrequestDTO } from '../../services/loginrequestDTO';

@Component({
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  selector: 'app-logincomponent',
  styleUrl: './logincomponent.css',
  templateUrl: './logincomponent.html',
})
export class Logincomponent {

  formulario: any;
  mensajeError = '';
  mensajeInfo = '';
  hide: boolean = true;

  constructor(
    private lS: Loginservice,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  iniciarSesion() {
    if (this.formulario.invalid) {
      this.mensajeError = 'Ingresa tu usuario y contraseña';
      return;
    }

    const dto: loginrequestDTO = {
      username: this.formulario.value.usuario,
      password: this.formulario.value.contrasena
    };

    this.lS.postlogin(dto).subscribe({
      next: data => {
        console.log('Inicio de sesión correcto:', data);

        this.mensajeError = '';
        this.mensajeInfo = 'Sesión iniciada correctamente';
        this.cdr.detectChanges();

        this.router.navigate(['/roles']);
      },
      error: err => {
        console.error('Error al iniciar sesión:', err);
        console.error('Estado HTTP:', err.status);
        console.error('Detalle:', err.error);

        this.mensajeError = 'Usuario o contraseña incorrectos';
        this.mensajeInfo = '';
        this.cdr.detectChanges();
      }
    });
  }
}
