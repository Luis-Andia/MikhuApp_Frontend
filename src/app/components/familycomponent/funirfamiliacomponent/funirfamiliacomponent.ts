
import { ChangeDetectorRef, Component } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loginservice } from '../../../services/loginservice';
import { Userservice } from '../../../services/userservice';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Menuadmincomponent } from '../../menuadmincomponent/menuadmincomponent';
import { Router } from '@angular/router';
import { JoinfamilyDTO } from '../../../models/JoinfamilyDTO';

@Component({
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    Menuadmincomponent
  ],
  selector: 'app-funirfamiliacomponent',
  styleUrl: './funirfamiliacomponent.css',
  templateUrl: './funirfamiliacomponent.html',
})
export class Funirfamiliacomponent {
  formulario: any;
  mensaje: string = '';
  hide: boolean = true;

  constructor(
    private fS: Familyservice,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private lS: Loginservice,
    private uS: Userservice,
    private router: Router
  ) {
    this.formulario = fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  clickEvent(event: MouseEvent): void {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  get username(): string {
    return this.lS.getUsername();
  }

  unirsefamilia(): void {
    this.mensaje = '';

    if (this.formulario.invalid) {
      this.mensaje = 'Los campos son obligatorios.';
      this.formulario.markAllAsTouched();
      return;
    }

    const familia: JoinfamilyDTO = {
      nomFamily: this.formulario.value.nombre.trim(),
      passwordFamily: this.formulario.value.contrasena
    };

    if (!this.username) {
      this.mensaje = 'No se encontró una sesión activa.';
      return;
    }

    this.uS.getuserbyusername(this.username).subscribe({
      next: (data: any) => {
        const idUser = data.idUser;

        this.fS.joinfamily(idUser, familia).subscribe({
          next: () => {
            // Consultar nuevamente al usuario para obtener su familia actualizada.
            this.uS.getuserbyusername(this.username).subscribe({
              next: (usuarioActualizado: any) => {
                const idFamily = usuarioActualizado.idFamily;

                if (!idFamily) {
                  this.mensaje = 'No se pudo obtener la familia asignada.';
                  this.cdr.detectChanges();
                  return;
                }

                this.router.navigate(['/familia/integrantes', idFamily]);
              },
              error: () => {
                this.mensaje = 'Te uniste a la familia, pero no se pudo cargar su información.';
                this.cdr.detectChanges();
              }
            });
          },
          error: (error) => {
            console.error('Error al unirse a la familia:', error);
            this.mensaje = error.status === 404
              ? 'No se encontró la familia indicada.'
              : 'Credenciales incorrectas. Inténtalo de nuevo.';
            this.cdr.detectChanges();
          }
        });
      },
      error: (error) => {
        console.error('Error al consultar usuario:', error);
        this.mensaje = 'No se pudo consultar tu usuario.';
        this.cdr.detectChanges();
      }
    });
  }
}
