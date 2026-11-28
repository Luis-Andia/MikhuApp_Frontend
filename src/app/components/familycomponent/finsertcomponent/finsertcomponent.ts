
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FamilyDTO } from '../../../models/FamilyDTO';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Menuadmincomponent } from '../../menuadmincomponent/menuadmincomponent';

@Component({
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    Menuadmincomponent
  ],
  selector: 'app-finsertcomponent',
  styleUrl: './finsertcomponent.css',
  templateUrl: './finsertcomponent.html',
})
export class Finsertcomponent {

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  formulario: any;
  mensaje: string = '';
  tipoMensaje: 'error' | 'success' = 'error';
  hide: boolean = true;

  constructor(
    private fS: Familyservice,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  clickEvent(event: MouseEvent): void {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  registrarFamilia(): void {
    this.mensaje = '';

    if (this.formulario.invalid) {
      this.tipoMensaje = 'error';
      this.mensaje = 'Los campos son obligatorios.';
      this.formulario.markAllAsTouched();
      return;
    }

    const familia: FamilyDTO = {
      nomFamily: this.formulario.value.nombre.trim(),
      passwordFamily: this.formulario.value.contrasena
    };

    this.fS.insertfamily(familia).subscribe({
      next: respuesta => {
        this.tipoMensaje = 'success';
        this.mensaje = '¡Familia registrada exitosamente!';

        this.formDirective.resetForm({
          nombre: '',
          contrasena: ''
        });

        this.hide = true;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error al registrar la familia:', err);

        this.tipoMensaje = 'error';

        if (err.status === 409) {
          this.mensaje = 'Ya existe una familia con ese nombre. Prueba con otro.';
        } else if (err.status === 400) {
          this.mensaje = 'Verifica los datos ingresados.';
        } else {
          this.mensaje = 'No se pudo registrar la familia. Intenta nuevamente.';
        }

        this.cdr.detectChanges();
      }
    });
  }
}
