import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Itemservice } from '../../../services/itemservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDTO } from '../../../models/ItemDTO';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Ingredientservice } from '../../../services/ingredientservice';
import { Familyservice } from '../../../services/familyservice';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink
  ],
  providers: [provideNativeDateAdapter()],
  selector: 'app-itupdatecomponent',
  styleUrl: './itupdatecomponent.css',
  templateUrl: './itupdatecomponent.html',
})
export class Itupdatecomponent implements OnInit{

  idItem: any = null
  formItem: any
  mensaje: string = ''
  listaIngredientes: any[] = [];
  listaFamilias: any[] = [];

  private iS = inject(Itemservice)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private cdr = inject(ChangeDetectorRef)
  private ins = inject(Ingredientservice)
  private fS = inject(Familyservice)

  ngOnInit(): void {
     // Recuperar ID desde la URL
    this.idItem = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.idItem);

    this.formItem = this.fb.group({
      codigo: [this.idItem],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechaCompra: [new Date(), Validators.required],
      fechaVencimiento: [new Date(), Validators.required],
      stockMinimo: [1, [Validators.required, Validators.min(1)]],
      idIngrediente: ['', Validators.required],
      idFamilia: ['', Validators.required],

    });

    if (!this.idItem|| isNaN(this.idItem)) {
      this.mensaje = 'ID inválido';
      return;
    }


    this.cargarIngredientes();
    this.cargarFamilias();
    this.buscarPorId();
    
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

  buscarPorId(): void {

    this.iS.listId(this.idItem).subscribe({

      next: (data: ItemDTO) => {

        console.log('Item encontrado:', data);

        this.formItem.patchValue({
          codigo: data.idItem,
          idFamilia: data.idFamily,
          idIngrediente: data.idIngredient,
          cantidad: data.amountAvailable,
          fechaCompra: data.purchaseDate ? new Date(String(data.purchaseDate).replace(/-/g, '/')) : null,
          fechaVencimiento: data.dueDate ? new Date(String(data.dueDate).replace(/-/g, '/')) : null,
          stockMinimo: data.minimumStock, 
        });

      },

      error: (error) => {
        console.error('Error al buscar item', error);
        this.mensaje = 'No se encontró el item';
      }

    });

  }

   actualizarItem(): void {


    const dto = {
      idItem: this.formItem.value.codigo,
      amountAvailable: this.formItem.value.cantidad,
      purchaseDate: this.formItem.value.fechaCompra,
      dueDate: this.formItem.value.fechaVencimiento,
      minimumStock: this.formItem.value.stockMinimo,
      
      // Si tienes llaves foráneas ( IDs ), se mapean aquí:
      idFamily: this.formItem.value.idFamilia,
      idIngredient: this.formItem.value.idIngrediente
    };

    this.iS.update(this.idItem,dto).subscribe({

      next: () => {
        this.mensaje = 'Actualizado correctamente!!';
        this.cdr.detectChanges()
        this.formItem.reset()
      },

      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
      }

    });

  }



}
