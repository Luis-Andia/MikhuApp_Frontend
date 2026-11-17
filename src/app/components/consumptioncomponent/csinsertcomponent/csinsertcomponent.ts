import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ConsumptionDTO } from '../../../models/ConsumptionDTO';
import { Consumptionservice } from '../../../services/consumptionservice';
import { form } from '@angular/forms/signals';
import { Recipeservice } from '../../../services/recipeservice';
import { Itemservice } from '../../../services/itemservice';
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
  selector: 'app-csinsertcomponent',
  styleUrl: './csinsertcomponent.css',
  templateUrl: './csinsertcomponent.html',
})
export class Csinsertcomponent implements OnInit {
  formConsumption: any;
  mensaje: string = '';
  listaRecetas: any[] = [];
  listaitems: any[] = [];
  fechaActual: Date = new Date();

  private fb = inject(FormBuilder);
  private csS = inject(Consumptionservice);
  private iS = inject(Itemservice);
  private rS = inject(Recipeservice);

  ngOnInit(): void {
    this.formConsumption = this.fb.group({
      fechaConsumo: [new Date(), Validators.required],
      idItem: ['', Validators.required],
      idReceta: ['', Validators.required],
    });

    this.cargarItems();
    this.cargarRecetas();
  }

  cargarItems(): void {
    this.iS.getItems().subscribe((data) => {
      console.log('Datos de items recibidos:', data);
      this.listaitems = data;
    });
  }

  cargarRecetas(): void {
    this.rS.getRecipes().subscribe((data) => {
      this.listaRecetas = data;
    });
  }

  registrarConsumo(): void {
    if (this.formConsumption.invalid) {
      this.mensaje = 'Los campos son obligatorios!!';
      return;
    }

    const dto: ConsumptionDTO = {
      consumptionDate: this.formConsumption.value.fechaConsumo,
      // Si tienes llaves foráneas ( IDs ), se mapean aquí:
      idReceta: this.formConsumption.value.idReceta,
      idItem: this.formConsumption.value.idItem,
    };

     this.csS.insertconsumption(dto).subscribe({

      next: () => {
        this.mensaje = 'Consumo registrado correctamente';
        this.formConsumption.reset({
          idConsumption: 0,
          fechaConsumo: new Date(),
          idItem: '',
          idReceta: ''
        });
      },

      error: (error) => {
        console.error('Error al registrar consumo:', error);
        this.mensaje = 'Error al registrar el consumo';
      }

    });
  }

  

}
