import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { Ingredientservice } from '../../../services/ingredientservice';
import { IngredientDTO } from '../../../models/IngredientDTO';


@Component({
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatSelectModule, RouterLink],
  selector: 'app-iupdatecomponent',
  styleUrl: './iupdatecomponent.css',
  templateUrl: './iupdatecomponent.html',
})
export class Iupdatecomponent implements OnInit{
  idIngredient:any=null
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

  constructor(private iS:Ingredientservice, private cdr:ChangeDetectorRef, private fb:FormBuilder,  private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.idIngredient = Number(this.route.snapshot.paramMap.get('id'))
    console.log('ID recibido:', this.idIngredient)

    if (!this.idIngredient || isNaN(this.idIngredient)) // Si es null o no es un num, entonces..
    {
      this.mensaje = 'ID inválido';
      return;
    }

    this.formulario=this.fb.group({
      codigo:[this.idIngredient],
      nombre:['', Validators.required],
      categoria:['', Validators.required]
    })

    this.buscarporId()
  }

  // BUSCAR POR ID
  buscarporId():void{
      this.iS.listId(this.idIngredient).subscribe({
        next:(data:IngredientDTO) => {
          console.log("Ingrediente encontrado: ", data) // Verificacion 2
  
          this.formulario.patchValue({ // Actualiza los campos del formulario con los valores que trajo el servidor
            codigo:data.idIngredient,
            nombre:data.nomIngredient,
            categoria:data.ingredientCategory
          })
  
        }, error:(error) => {
          console.error('Error al buscar el ingrediente', error);
          this.mensaje = 'No se encontró el ingrediente';
        },
      })
  }

  // ACTUALIZAR INGREDIENTE
  actualizarIngrediente():void {
    const dto = { // Se crea un dto para reemplazar
      idIngredient:this.formulario.value.codigo,
      nomIngredient:this.formulario.value.nombre,
      ingredientCategory:this.formulario.value.categoria
    }

    if(this.formulario.invalid){
      this.mensaje = 'Los campos son obligatorios'
      return
    }
    
    this.iS.updateingredient(dto).subscribe({
      next: () => {
        this.mensaje = 'Actualizado correctamente!!';
        this.cdr.detectChanges()
        this.formulario.reset()
        this.router.navigate(['/ingrediente/listar']);
      },
      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
      }
    })
  }
}
