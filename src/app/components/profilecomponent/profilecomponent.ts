import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Userservice } from '../../services/userservice';
import { Loginservice } from '../../services/loginservice';

@Component({
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-profilecomponent',
  styleUrl: './profilecomponent.css',
  templateUrl: './profilecomponent.html',
})
export class Profilecomponent implements OnInit {
  idUser: number = 0;
  idRole: number = 0;
  idFamily: number = 0;
  idCountry: number = 0;
  lastNameUser: string = '';
  formulario: any;
  mensaje: string = '';

  constructor(
    private uS: Userservice,
    private loginService: Loginservice,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nomUser: ['', Validators.required],
      lastNameUser: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, Validators.required],
      password: ['', Validators.required],
    });

    this.buscarUsuarioActual();
  }

  buscarUsuarioActual(): void {
    const actualUsername = this.loginService.getUsername();

    if (!actualUsername) {
      this.mensaje = 'No hay usuario en sesión';
      return;
    }

    this.uS.getuserbyusername(actualUsername).subscribe({
      next: (data: any) => {
        let u: any = null;

        if (Array.isArray(data) && data.length > 0) {
          u = data[0];
        } else if (data && typeof data === 'object') {
          u = data;
        }

        if (u) {
          this.idUser = u.idUser;
          this.lastNameUser = u.lastNameUser;

          if (Array.isArray(u.idRol) && u.idRol.length > 0) {
            this.idRole = u.idRol[0];
          } else if (u.idRol) {
            this.idRole = u.idRol;
          } else if (u.idRole) {
            this.idRole = u.idRole;
          }

          if (u.idFamily) {
            this.idFamily = u.idFamily;
          }

          if (u.idCountry) {
            this.idCountry = u.idCountry;
          }

          this.formulario.patchValue({
            nomUser: u.nomUser,
            lastNameUser: u.lastNameUser,
            email: u.email,
            age: u.age,
          });

          this.cdr.detectChanges();
        } else {
          this.mensaje = 'No se encontró el usuario';
        }
      },
      error: (error) => {
        console.error('Error al buscar el usuario', error);
        this.mensaje = 'No se pudo cargar el perfil';
      },
    });
  }

  actualizarPerfil(): void {
    if (this.formulario.invalid) {
      this.mensaje = 'Los campos son obligatorios';
      return;
    }

    if (!this.idUser || this.idUser === 0) {
      this.mensaje = 'No se cargó el ID del usuario';
      return;
    }

    const dto: any = {
      idUser: this.idUser,
      idRole: this.idRole,
      idRol: [this.idRole],
      password: this.formulario.value.password,
      nomUser: this.formulario.value.nomUser,
      lastNameUser: this.formulario.value.lastNameUser,
      age: this.formulario.value.age,
      email: this.formulario.value.email,
      idFamily: this.idFamily,
      idCountry: this.idCountry,
    };

    this.uS.updateUser(this.idUser, dto).subscribe({
      next: () => {
        sessionStorage.setItem('username', this.formulario.value.nomUser);
        this.mensaje = 'Actualizado correctamente!!';
        this.cdr.detectChanges();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al actualizar el perfil', error);
        this.mensaje = 'Error al actualizar!!';
      },
    });
  }
}
