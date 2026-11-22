
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IngredienteAVailableByFamilyDTO } from '../../../models/IngredientAvailableByFamilyDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { Itemservice } from '../../../services/itemservice';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  imports: [BaseChartDirective, MatIconModule],
  selector: 'app-ingredientavailablecomponent',
  styleUrl: './ingredientavailablecomponent.css',
  templateUrl: './ingredientavailablecomponent.html',
})
export class Ingredientavailablecomponent implements OnInit {

  lista: IngredienteAVailableByFamilyDTO[] = [];

  public chartType: TipoGrafico = 'bar';

  public chartData: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Cantidad disponible',
        data: [],
        borderWidth: 1,
        backgroundColor: '#109543',
        borderColor: '#087A35',
      },
    ],
  };

  public chartOptions: ChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cantidad de ingredientes disponibles',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Cantidad disponible: ${context.parsed.x}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad disponible',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ingredientes',
        },
      },
    },
  };

  constructor(
    private iS: Itemservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.IngredientesDisponibles();
  }

  IngredientesDisponibles(): void {
    this.iS.getIngredientAvailable(1).subscribe({
      next: (data: IngredienteAVailableByFamilyDTO[]) => {

        this.lista = data;

        this.chartData = {
          labels: data.map((item) => item.nomIngredient),
          datasets: [
            {
              label: 'Cantidad disponible',
              data: data.map((item) => item.amountAvailable),
              borderWidth: 1,
              backgroundColor: '#109543',
              borderColor: '#087A35',
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
