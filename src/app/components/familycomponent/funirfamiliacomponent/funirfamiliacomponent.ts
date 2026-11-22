import { ChangeDetectorRef, Component } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FormBuilder, Validators } from '@angular/forms';
import { FamilyDTO } from '../../../models/FamilyDTO';

@Component({
  imports: [],
  selector: 'app-funirfamiliacomponent',
  styleUrl: './funirfamiliacomponent.css',
  templateUrl: './funirfamiliacomponent.html',
})
export class Funirfamiliacomponent {
  formulario:any
  mensaje:string=''
  hide: boolean = true; // Para la contraseña
  constructor(private fS: Familyservice, private cdr: ChangeDetectorRef, private fb:FormBuilder)
  {
    this.formulario=fb.group({
      nombre:['', Validators.required],
      contrasena:['', Validators.required]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation(); // Evita comportamientos no deseados al hacer clic
  }

  validarfamilia(){
    if(this.formulario.invalid){
      this.mensaje = 'Los campos son obligatorios'
      return
    }

    const familia:FamilyDTO={
      nomFamily:this.formulario.value.nombre,
      passwordFamily:this.formulario.value.contrasena,
    }

    
    // validacion de nombre/contraseña con alguna familia existente, variable booleana
    // if(){
      // this.mensaje = ''
    // }
  }
}
