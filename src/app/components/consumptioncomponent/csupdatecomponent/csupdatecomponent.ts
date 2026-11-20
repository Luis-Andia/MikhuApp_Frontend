import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Consumptionservice } from '../../../services/consumptionservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumptionDTO } from '../../../models/ConsumptionDTO';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Itemservice } from '../../../services/itemservice';
import { Recipeservice } from '../../../services/recipeservice';
import { RouterLink } from '@angular/router';


@Component({
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink],
  selector: 'app-csupdatecomponent',
  styleUrl: './csupdatecomponent.css',
  templateUrl: './csupdatecomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class Csupdatecomponent implements OnInit{

  idConsumo: any = null
  formConsumo: any
  mensaje: string = ''
  listaItems: any[] = [];
  listaRecipes: any[] = [];

  private iS = inject(Itemservice)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private cdr = inject(ChangeDetectorRef)
  private csS = inject(Consumptionservice)
  private rS = inject(Recipeservice)
  
  
  ngOnInit(): void {
    this.idConsumo = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.idConsumo);

    this.formConsumo = this.fb.group({
      codigo: [this.idConsumo],
      fechaConsumo: [new Date(), Validators.required],
      idItem: ['', Validators.required],
      idReceta: ['', Validators.required],

    });

    if (!this.idConsumo|| isNaN(this.idConsumo)) {
      this.mensaje = 'ID inválido';
      return;
    }


    this.cargarItems();
    this.cargarRecipes();
    this.buscarPorId();
    
  }

  cargarItems(): void {

    this.iS.getItems().subscribe(data => {
      console.log("Datos de ingredientes recibidos:", data)
      this.listaItems = data;
    });
  }

  cargarRecipes(): void {

    this.rS.getRecipes().subscribe(data => {
      this.listaRecipes = data;
    });
  }

  buscarPorId(): void {
  
      this.csS.listId(this.idConsumo).subscribe({
  
        next: (data: ConsumptionDTO) => {
  
          console.log('Item encontrado:', data);
  
          this.formConsumo.patchValue({
            codigo: data.idConsumption,
            fechaConsumo: data.consumptionDate ? new Date(String(data.consumptionDate).replace(/-/g, '/')) : null,
            idItem: data.idItem,
            idReceta: data.idReceta
          });
  
        },
  
        error: (error) => {
          console.error('Error al buscar consumo', error);
          this.mensaje = 'No se encontró el consumo';
        }
  
      });
  
    }

    actualizarConsumo(): void {


    const dto = {
      idConsumption: this.formConsumo.value.codigo,
      idItem: this.formConsumo.value.idItem,
      idReceta: this.formConsumo.value.idReceta,
      consumptionDate: this.formConsumo.value.fechaConsumo
    };

    this.csS.update(dto).subscribe({

      next: () => {
        this.mensaje = 'Actualizado correctamente!!';
        this.cdr.detectChanges()
        this.formConsumo.reset()
      },

      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
      }

    });

  }


}
