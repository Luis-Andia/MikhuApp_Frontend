import { ChangeDetectorRef, Component } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FamilyDTO } from '../../../models/FamilyDTO';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  imports: [MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  selector: 'app-finsertcomponent',
  styleUrl: './finsertcomponent.css',
  templateUrl: './finsertcomponent.html',
})

export class Finsertcomponent {
  formulario:any
  mensaje:string=''
  hide: boolean = true; // Para la contraseña

  constructor(private fS:Familyservice, private cdr:ChangeDetectorRef, private fb:FormBuilder){
    this.formulario=fb.group({
      nombre:['', Validators.required],
      contrasena:['', Validators.required]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation(); // Evita comportamientos no deseados al hacer clic
  }

  registrarFamilia(){
    if(this.formulario.invalid){
      this.mensaje = 'Los campos son obligatorios'
      return
    }

    const familia:FamilyDTO={
      nomFamily:this.formulario.value.nombre,
      passwordFamily:this.formulario.value.contrasena,
    }

    this.fS.insertfamily(familia).subscribe({
      next:respuesta=>{
        this.mensaje = 'Familia registrada exitosamente'
        this.cdr.detectChanges()
        this.formulario.reset()
      }, error:err => {
        console.log("Ocurrio un error al registrar")
        this.mensaje = 'Error de registro interno'
        this.cdr.detectChanges()
      },
    })
  }
}
