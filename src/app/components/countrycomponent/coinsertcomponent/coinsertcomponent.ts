import { ChangeDetectorRef, Component } from '@angular/core';
import { Countryservice } from '../../../services/countryservice';
import { CountryDTO } from '../../../models/CountryDTO';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  selector: 'app-coinsertcomponent',
  styleUrl: './coinsertcomponent.css',
  templateUrl: './coinsertcomponent.html',
})
export class Coinsertcomponent {
  formulario:any
  mensaje:string=''

  constructor(private coS:Countryservice, private cdr:ChangeDetectorRef, private fb:FormBuilder){
    this.formulario=fb.group({
      codigo:['', Validators.required],
      nombre:['', Validators.required]
    })
  }

  // HU64: REGISTRAR PAIS
  registrarPais(){
    if(this.formulario.invalid){
      this.mensaje = 'Los campos son obligatorios'
      return
    }

    const pais:CountryDTO={
      codCountry:this.formulario.value.codigo,
      nomCountry:this.formulario.value.nombre,
    }

    this.coS.insertcountry(pais).subscribe({
      next:respuesta=>{
        this.mensaje = 'País registrado exitosamente'
        this.cdr.detectChanges()
        this.formulario.reset()
      }, error:err => {
        console.log("Ocurrio un error al registrar el pais")
        this.mensaje = 'Error de registro interno'
        this.cdr.detectChanges()
      },
    })
  }
}