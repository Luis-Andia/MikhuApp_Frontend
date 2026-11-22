import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LowStockItemsDTO } from '../../../models/LowStockItemsDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { Itemservice } from '../../../services/itemservice';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';


type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';
@Component({
  imports: [BaseChartDirective, MatIconModule],
  selector: 'app-lowstockitemscomponent',
  styleUrl: './lowstockitemscomponent.css',
  templateUrl: './lowstockitemscomponent.html',
})
export class Lowstockitemscomponent implements OnInit{
  lista: LowStockItemsDTO[] = [];
  public chartType: TipoGrafico = 'pie';
  public chartData: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Alimentos con bajo stock',
        data: [],
        borderWidth: 1,
      },
    ],
  };
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cantidad',
      },
    },
  };
  constructor(
    private iS: Itemservice,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.bajoStock();
  }
  bajoStock(): void {

    this.iS.getlowStockitems(1).subscribe({
    next: (data: LowStockItemsDTO[]) => {
      this.lista = data;

      this.chartData = {
        labels: data.map((item) => item.nomIngredient),
        datasets: [
          {
            label: 'Cantidad de ingredientes',
            data: data.map((item) => item.amountAvailable),
            borderWidth: 1,
          },
        ],
      };

      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al cargar los ingredientes:', error);
    },
  });
  }
}
