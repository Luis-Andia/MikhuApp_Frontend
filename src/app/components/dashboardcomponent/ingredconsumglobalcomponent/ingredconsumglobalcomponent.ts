import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MostConsumedIngredientsDTO } from '../../../models/MostConsumedIngredientsDTO';
import { Userservice } from '../../../services/userservice';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Consumptionservice } from '../../../services/consumptionservice';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  imports: [BaseChartDirective],
  selector: 'app-ingredconsumglobalcomponent',
  styleUrl: './ingredconsumglobalcomponent.css',
  templateUrl: './ingredconsumglobalcomponent.html',
})
export class Ingredconsumglobalcomponent implements OnInit {
  lista:MostConsumedIngredientsDTO[] = []
  
  public chartType: TipoGrafico = 'bar';
  
  public chartData: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Alimentos más consumidos',
        data: [],
        borderWidth: 1
      }
    ]
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Numero de consumos registrados'
      }
    }
  };

  constructor(private cS: Consumptionservice, private uS:Userservice, private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.obtenerItemsConsumidos()
  }

  obtenerItemsConsumidos():void {
        this.cS.MostConsumedIngredientsGlobal().subscribe({
          next: (data: MostConsumedIngredientsDTO[]) => {
            this.lista = data;
            this.chartData = {
              labels: data.map(item => item.nomIngredient),
              datasets: [
                {
                  label: 'Nro consumos',
                  data: data.map(item => item.quantity),
                  borderWidth: 1
                }
              ]
            };
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error al cargar los datos del reporte:', error);
          }
    })
  }
}
