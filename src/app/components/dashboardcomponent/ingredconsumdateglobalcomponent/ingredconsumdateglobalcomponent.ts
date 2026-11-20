import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MostConsumedIngredientsDTO } from '../../../models/MostConsumedIngredientsDTO';
import { Consumptionservice } from '../../../services/consumptionservice';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  imports: [BaseChartDirective, ReactiveFormsModule, MatIconModule,MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  selector: 'app-ingredconsumdateglobalcomponent',
  styleUrl: './ingredconsumdateglobalcomponent.css',
  templateUrl: './ingredconsumdateglobalcomponent.html',
})
export class Ingredconsumdateglobalcomponent implements OnInit{
  formulario: any
  lista: MostConsumedIngredientsDTO[] = []
  mensaje: string = ''
  hoy: Date = new Date()

  public chartType: TipoGrafico = 'pie';


  public chartData: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      { label:'Nro consumos',
        data: [],
        borderWidth: 1 
      }
    ]
  }

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Número de consumos registrados'
      }
    }
  }

  constructor(private cS: Consumptionservice,private cdr: ChangeDetectorRef,private fb: FormBuilder) {
  const fin = new Date();
  const inicio = new Date(fin);
  inicio.setDate(fin.getDate() - 30);

  this.formulario = this.fb.group({
    fechaInicio: [inicio, Validators.required],
    fechaFin: [fin, Validators.required]
  });
}
    
  ngOnInit(): void {
    this.obtenerItemsConsumidosporFecha()
  }

  obtenerItemsConsumidosporFecha():void {
    if (this.formulario.invalid) {
      this.mensaje = 'Selecciona la fecha de inicio y la fecha final'
      return
    }

    const inicio: Date = this.formulario.value.fechaInicio
    const fin: Date = this.formulario.value.fechaFin

    if (inicio > fin) {
      this.mensaje = 'La fecha inicial no puede ser posterior a la fecha final'
      return
    }

      this.cS.Ingredienteconsumedbydate(this.formatear(inicio), this.formatear(fin)).subscribe({
      next: (data: MostConsumedIngredientsDTO[]) => {
        this.lista = data
        this.chartData = {
          labels: data.map(item => item.nomIngredient),
          datasets: [
            {
              label: 'Nro consumos',
              data: data.map(item => item.quantity),
              borderWidth: 1
            }
          ]
        }
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error('Error al cargar los datos del reporte:', error)
        this.lista = []
        this.mensaje = 'No se pudo cargar el reporte. Revisa las fechas e inténtalo de nuevo'
        this.cdr.detectChanges()
      }
    })
  }

  private formatear(fecha: Date): string {
    const y = fecha.getFullYear()
    const m = String(fecha.getMonth() + 1).padStart(2, '0')
    const d = String(fecha.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
}
