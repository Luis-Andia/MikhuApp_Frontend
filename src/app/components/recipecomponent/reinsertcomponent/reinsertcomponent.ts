import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Recipeservice } from '../../../services/recipeservice';
import { Countryservice } from '../../../services/countryservice';
import { RecipeDTO } from '../../../models/RecipeDTO';
import { CountryDTO } from '../../../models/CountryDTO';

@Component({
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  selector: 'app-reinsertcomponent',
  styleUrl: './reinsertcomponent.css',
  templateUrl: './reinsertcomponent.html',
})
export class Reinsertcomponent implements OnInit {
  formulario:any
  mensaje:string = ''
  paises:CountryDTO[] = []

  constructor(private reS:Recipeservice, private coS:Countryservice, private cdr:ChangeDetectorRef, private fb:FormBuilder){
    this.formulario = fb.group({
      nombre:['', Validators.required],
      pais:['', Validators.required],
      calorias:['', [Validators.required, Validators.min(1)]],
      dificultad:['', [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.obtenerPaises()
  }

  // Carga los países para el desplegable
  obtenerPaises(){
    this.coS.getcountries().subscribe({
      next:data => {
        this.paises = data
        this.cdr.detectChanges()
      }, error:err => {
        console.log('Ocurrio un error al listar los paises')
      }
    })
  }

  // HU82: REGISTRAR RECETA
  registrarReceta(){
    if(this.formulario.invalid){
      this.mensaje = 'Los campos son obligatorios y los números deben ser mayores a 0'
      return
    }

    const receta:RecipeDTO = {
      nomRecipe:this.formulario.value.nombre,
      idCountry:this.formulario.value.pais,
      calories:this.formulario.value.calorias,
      difficulty:this.formulario.value.dificultad
    }

    this.reS.insertRecipe(receta).subscribe({
      next:respuesta => {
        this.mensaje = 'Receta registrada exitosamente'
        this.cdr.detectChanges()
        this.formulario.reset()
      }, error:err => {
        console.log('Ocurrio un error al registrar la receta')
        this.mensaje = 'Error de registro interno'
        this.cdr.detectChanges()
      }
    })
  }
}