import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatSelectModule, RouterLink],
  selector: 'app-reupdatecomponent',
  styleUrl: './reupdatecomponent.css',
  templateUrl: './reupdatecomponent.html',
})
export class Reupdatecomponent implements OnInit {
  idRecipe:any = null
  formulario:any
  mensaje:string = ''
  paises:CountryDTO[] = []

  constructor(private reS:Recipeservice, private coS:Countryservice, private cdr:ChangeDetectorRef, private fb:FormBuilder, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.idRecipe = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.idRecipe || isNaN(this.idRecipe)) {
      this.mensaje = 'ID inválido'
      return
    }

    this.formulario = this.fb.group({
      id:[this.idRecipe],
      nombre:['', Validators.required],
      pais:['', Validators.required],
      calorias:['', [Validators.required, Validators.min(1)]],
      dificultad:['', [Validators.required, Validators.min(1)]]
    })

    this.obtenerPaises()
    this.buscarporId()
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

  // BUSCAR POR ID
  buscarporId():void {
    this.reS.listId(this.idRecipe).subscribe({
      next:(data:RecipeDTO) => {
        this.formulario.patchValue({
          id:data.idRecipe,
          nombre:data.nomRecipe,
          pais:data.idCountry,
          calorias:data.calories,
          dificultad:data.difficulty
        })
        this.cdr.detectChanges()
      },
      error:(error) => {
        console.error('Error al buscar la receta', error)
        this.mensaje = 'No se encontró la receta'
        this.cdr.detectChanges()
      }
    })
  }

  // HU84: ACTUALIZAR RECETA
  actualizarReceta():void {
    if (this.formulario.invalid) {
      this.mensaje = 'Los campos son obligatorios y los números deben ser mayores a 0'
      return
    }

    const dto:RecipeDTO = {
      idRecipe:this.formulario.value.id,
      nomRecipe:this.formulario.value.nombre,
      idCountry:this.formulario.value.pais,
      calories:this.formulario.value.calorias,
      difficulty:this.formulario.value.dificultad
    }

    this.reS.updateRecipe(dto).subscribe({
      next: () => {
        this.mensaje = 'Receta actualizada correctamente'
        this.cdr.detectChanges()
        this.router.navigate(['/recetas/listar'])
      },
      error: (error) => {
        console.error(error)
        this.mensaje = 'Error al actualizar la receta'
        this.cdr.detectChanges()
      }
    })
  }
}