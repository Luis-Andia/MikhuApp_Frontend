
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Itemservice } from '../../../services/itemservice';
import { ItemDTO } from '../../../models/ItemDTO';
import { Ingredientservice } from '../../../services/ingredientservice';
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
export class Itinsertcomponent implements OnInit {

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  formItem: any;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' = 'success';

  listaIngredientes: any[] = [];
  listaFamilias: any[] = [];

  fechaActual: Date = new Date();

  private fb = inject(FormBuilder);
  private iS = inject(Itemservice);
  private ins = inject(Ingredientservice);
  private fS = inject(Familyservice);

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
    this.ins.getIngredient().subscribe({
      next: data => {
        console.log('Ingredientes recibidos:', data);
        this.listaIngredientes = data;
      },
      error: error => {
        console.error('Error al cargar ingredientes:', error);
      }
    });
  }

  cargarFamilias(): void {
    this.fS.getfamilies().subscribe({
      next: data => {
        console.log('Familias recibidas:', data);
        this.listaFamilias = data;
      },
      error: error => {
        console.error('Error al cargar familias:', error);
        this.tipoMensaje = 'error';
        this.mensaje = 'No se pudieron cargar las familias.';
      }
    });
  }

  registrarItem(): void {
    this.mensaje = '';

    if (this.formItem.invalid) {
      this.tipoMensaje = 'error';
      this.mensaje = 'Completa correctamente todos los campos obligatorios.';
      this.formItem.markAllAsTouched();
      return;
    }

    const dto: ItemDTO = {
      amountAvailable: Number(this.formItem.value.cantidad),
      purchaseDate: this.formItem.value.fechaCompra,
      dueDate: this.formItem.value.fechaVencimiento,
      minimumStock: Number(this.formItem.value.stockMinimo),
      idFamily: Number(this.formItem.value.idFamilia),
      idIngredient: Number(this.formItem.value.idIngrediente)
    };

    this.iS.insert(dto).subscribe({
      next: () => {
        this.tipoMensaje = 'success';
        this.mensaje = '¡Ítem registrado correctamente!';

        // Reinicia el formulario y su estado de validación.
        this.formDirective.resetForm({
          cantidad: 1,
          fechaCompra: new Date(),
          fechaVencimiento: new Date(),
          stockMinimo: 1,
          idFamilia: '',
          idIngrediente: ''
        });
      },

      error: error => {
        console.error('Error al registrar ítem:', error);
        this.tipoMensaje = 'error';
        this.mensaje = 'No se pudo registrar el ítem. Verifica los datos e intenta nuevamente.';
      }
    });
  }
}
