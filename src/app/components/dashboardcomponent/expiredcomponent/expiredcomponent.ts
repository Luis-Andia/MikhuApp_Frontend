import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NearExpirationDTO } from '../../../models/NearExpirationDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { Itemservice } from '../../../services/itemservice';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { ExpiredDTO } from '../../../models/ExpiredDTO';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  imports: [BaseChartDirective, MatIconModule],
  selector: 'app-expiredcomponent',
  styleUrl: './expiredcomponent.css',
  templateUrl: './expiredcomponent.html',
})
export class Expiredcomponent implements OnInit{
  lista: ExpiredDTO[] = [];

  // Almacena el detalle de ingredientes agrupados por fecha
  detallePorFecha: string[][] = [];

  public chartType: TipoGrafico = 'bar';

  public chartData: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Cantidad disponible',
        data: [],
        borderWidth: 1,
        backgroundColor: '#109543',
        borderColor: '#109543',
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
        text: 'Alimentos vencidos',
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            return 'Fecha: ' + items[0].label;
          },
          label: (context) => {
            return 'Cantidad total: ' + context.parsed.y;
          },
          afterBody: (items) => {
            const index = items[0].dataIndex;
            return [
              'Ingredientes:',
              ...this.detallePorFecha[index]
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad disponible',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Fecha de vencimiento',
        },
      },
    },
  };

  constructor(
    private iS: Itemservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.Vencidos();
  }

  Vencidos(): void {
    this.iS.getExpired(1).subscribe({
      next: (data: ExpiredDTO[]) => {

        this.lista = data;

        // Agrupar alimentos por fecha de vencimiento
        const agrupados = new Map<string, ExpiredDTO[]>();

        data.forEach((item) => {
          const fecha = item.dueDate.toString();

          if (!agrupados.has(fecha)) {
            agrupados.set(fecha, []);
          }

          agrupados.get(fecha)!.push(item);
        });

        // Ordenar fechas cronológicamente
        const fechas = Array.from(agrupados.keys()).sort();

        this.detallePorFecha = fechas.map((fecha) =>
          agrupados.get(fecha)!.map((item) =>
            `${item.nomIngredient}: ${item.amountAvailable} unidades`
          )
        );

        // Construir el gráfico
        this.chartData = {
          labels: fechas.map((fecha) => {
            const [anio, mes, dia] = fecha.split('-');
            return `${dia}/${mes}/${anio}`;
          }),
          datasets: [
            {
              label: 'Cantidad disponible',
              data: fechas.map((fecha) =>
                agrupados.get(fecha)!.reduce(
                  (total, item) => total + item.amountAvailable,
                  0
                )
              ),
              borderWidth: 1,
              backgroundColor: '#E5A642',
              borderColor: '#C58A2C',
            },
          ],
        };

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar los alimentos:', error);
      },
    });
  }
}
