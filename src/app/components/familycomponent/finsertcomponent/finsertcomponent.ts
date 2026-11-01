import { ChangeDetectorRef, Component } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FamilyDTO } from '../../../models/FamilyDTO';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  selector: 'app-finsertcomponent',
  styleUrl: './finsertcomponent.css',
  templateUrl: './finsertcomponent.html',
})

export class Finsertcomponent {
  family:FamilyDTO = {
    nomFamily:'',
    passwordFamily:''
  }

  mensaje:string=''
  mensajeErrorNombre = ''
  mensajeErrorPassword = ''

  hide: boolean = true;

  constructor(private fS:Familyservice, private cdr:ChangeDetectorRef){}

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation(); // Evita comportamientos no deseados al hacer clic
  }

  registrarFamilia(){

    if(this.family.nomFamily.trim() === ''){
      this.mensajeErrorNombre = 'El nombre es obligatorio';
      this.cdr.detectChanges();
      return;
    }

    if(this.family.passwordFamily.trim() === ''){
      this.mensajeErrorPassword = 'La contraseña es obligatoria';
      this.cdr.detectChanges();
      return;
    }

    this.fS.postfamily(this.family).subscribe({
      next:data => {
        this.family = data
        this.cdr.detectChanges()
      }, error:(err) => {
        console.log('Ocurrio un error')
        this.mensaje='Error al registrar'
      },
    })
  }
}
