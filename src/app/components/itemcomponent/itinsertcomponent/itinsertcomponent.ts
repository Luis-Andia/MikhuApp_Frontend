import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Itemservice } from '../../../services/itemservice';
import { ItemDTO } from '../../../models/ItemDTO';
import { Ingredientservice} from '../../../services/ingredientservice';
import { Familyservice } from '../../../services/familyservice';


@Component({
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  selector: 'app-itinsertcomponent',
  styleUrl: './itinsertcomponent.css',
  templateUrl: './itinsertcomponent.html',
})
export class Itinsertcomponent implements OnInit{

  formItem: any;
  mensaje: string = ''
  listaIngredientes: any[] = [];
  listaFamilias: any[] = [];
  fechaActual: Date = new Date()

  private fb = inject(FormBuilder)
  private iS = inject(Itemservice)
  private ins = inject(Ingredientservice)
  private fS = inject(Familyservice)


  
  ngOnInit(): void {
    this.formItem = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechaCompra: [new Date(), Validators.required],
      fechaVencimiento: [new Date(), Validators.required],
      stockMinimo: [1, [Validators.required, Validators.min(1)]],
      idIngrediente: ['', Validators.required],
      idFamilia: ['', Validators.required],
    });
    this.cargarIngredientes();
    this.cargarFamilias();
    
  }

  cargarIngredientes(): void {

    this.ins.getIngredient().subscribe(data => {
      console.log("Datos de ingredientes recibidos:", data)
      this.listaIngredientes = data;
    });
  }

  cargarFamilias(): void {

    this.fS.getfamilies().subscribe(data => {
      this.listaFamilias = data;
    });
  }

    registrarItem(): void {

    if (this.formItem.invalid) {
      this.mensaje = "Los campos son obligatorios!!"
      return
    }

    const dto: ItemDTO = {
      amountAvailable: this.formItem.value.cantidad,
      purchaseDate: this.formItem.value.fechaCompra,
      dueDate: this.formItem.value.fechaVencimiento,
      minimumStock: this.formItem.value.stockMinimo,
      
      // Si tienes llaves foráneas ( IDs ), se mapean aquí:
      idFamily: this.formItem.value.idFamilia,
      idIngredient: this.formItem.value.idIngrediente

    };

    this.iS.insert(dto).subscribe({

      next: () => {
        this.mensaje = 'Item registrado correctamente';
        this.formItem.reset({
          idItem: 0,
          cantidad: 0,
          fechaCompra: new Date(),
          fechaVencimiento: new Date(),
          stockMinimo: 0,
          idFamilia: '',
          idIngrediente: ''
        });
      },

      error: (error) => {
        console.error('Error al registrar item:', error);
        this.mensaje = 'Error al registrar el item';
      }

    });

  }

}
