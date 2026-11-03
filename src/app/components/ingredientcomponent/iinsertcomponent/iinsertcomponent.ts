import { ChangeDetectorRef, Component } from '@angular/core';
import { Ingredientservice } from '../../../services/ingredientservice';
import { IngredientDTO } from '../../../models/IngredientDTO';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, MatSelectModule],
  selector: 'app-iinsertcomponent',
  styleUrl: './iinsertcomponent.css',
  templateUrl: './iinsertcomponent.html',
})
export class Iinsertcomponent {
  ingredient:IngredientDTO = {nomIngredient:'', ingredientCategory:''}
  mensaje:string = ''
  categorias: Categoria[] = [
    {value: 'bebida', viewValue: 'Bebidas'},
    {value: 'carne', viewValue: 'Carnes'},
    {value: 'cereal', viewValue: 'Cereales/harinas'},
    {value: 'fruta', viewValue: 'Frutas'},
    {value: 'lacteo', viewValue: 'Lacteos'},
    {value: 'verdura', viewValue: 'Verduras'}
  ];

  constructor(private iS: Ingredientservice, private cdr: ChangeDetectorRef){}

  registrarIngrediente(){
    
    if(this.ingredient.nomIngredient.trim()==='' && this.ingredient.ingredientCategory.trim()===''){
      this.mensaje = 'Complete los campos solicitados'
      return
    }
    
    if(this.ingredient.nomIngredient.trim()===''){
      this.mensaje = 'Error al registrar el nombre'
      return
    }

    if(this.ingredient.ingredientCategory.trim()===''){
      this.mensaje = 'Error al registrar la categoria'
      return
    }

    this.iS.postIngredient(this.ingredient).subscribe({
      next:data=>{
        this.ingredient = data
        this.mensaje = 'Ingrediente registrado exitosamente'
        this.cdr.detectChanges()
      }, error:(err) => {
        console.log("Ocurrio un error al registrar")
        this.mensaje = 'Error de registro interno'
      },
    })
  }
}
