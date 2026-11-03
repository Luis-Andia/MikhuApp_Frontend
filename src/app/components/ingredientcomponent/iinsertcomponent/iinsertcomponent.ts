import { ChangeDetectorRef, Component } from '@angular/core';
import { Ingredientservice } from '../../../services/ingredientservice';
import { IngredientDTO } from '../../../models/IngredientDTO';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  selector: 'app-iinsertcomponent',
  styleUrl: './iinsertcomponent.css',
  templateUrl: './iinsertcomponent.html',
})
export class Iinsertcomponent {
  formulario:any
  mensaje:string = ''

  categorias: any[] = [
    {value: 'Bebidas', viewValue: 'Bebidas'},
    {value: 'Carnes', viewValue: 'Carnes'},
    {value: 'Cereales', viewValue: 'Cereales/harinas'},
    {value: 'Frutas', viewValue: 'Frutas'},
    {value: 'Lacteos', viewValue: 'Lacteos'},
    {value: 'Tuberculos', viewValue: 'Tuberculos'},
    {value: 'Verduras', viewValue: 'Verduras'}
  ];

  constructor(private iS: Ingredientservice, private cdr: ChangeDetectorRef, private fb:FormBuilder)
  {
    this.formulario=fb.group({
      nombre:['', Validators.required],
      categoria:['',Validators.required],
    })
  }

  registrarIngrediente(){
    if(this.formulario.invalid){
      this.mensaje = 'Los campos son obligatorios'
      return
    }

    const ingrediente:IngredientDTO={
      idIngredient:0,
      nomIngredient:this.formulario.value.nombre,
      ingredientCategory:this.formulario.value.categoria,
    }
    
    this.iS.insertIngredient(ingrediente).subscribe({
      next:respuesta=>{
        this.mensaje = 'Ingrediente registrado exitosamente'
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
