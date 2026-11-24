
import { ChangeDetectorRef, Component, OnInit, inject} from '@angular/core';
import { NearExpirationDTO } from '../../../models/NearExpirationDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { Itemservice } from '../../../services/itemservice';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { Userservice } from '../../../services/userservice';
import { Loginservice } from '../../../services/loginservice';


type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  imports: [BaseChartDirective, MatIconModule],
  selector: 'app-nearexpirationcomponent',
  styleUrl: './nearexpirationcomponent.css',
  templateUrl: './nearexpirationcomponent.html',
})
export class Nearexpirationcomponent implements OnInit {

  lista: NearExpirationDTO[] = [];

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
        text: 'Alimentos próximos a vencer',
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

  private uS = inject(Userservice);
  private idFamily: number = 0;
  private loginService = inject(Loginservice);
  get nombreUsuario(): string {
    return this.loginService.getUsername() || 'Usuario';
  }

  ngOnInit(): void {
    this.uS.getuserbyusername(this.nombreUsuario).subscribe({
      next: (data: any) => {
        this.idFamily = data.idFamily;

        if (!this.idFamily) {
          console.log('El usuario no tiene una familia asociada');
        }
        
        this.Proximosvencer(this.idFamily);

      },
      error: (err) => {
        console.log('Error al obtener la información del usuario logueado');
      },
    });
  }

  Proximosvencer(idFamilia:number): void {
    this.iS.getNearExpiration(idFamilia).subscribe({
      next: (data: NearExpirationDTO[]) => {

        this.lista = data;

        // Agrupar alimentos por fecha de vencimiento
        const agrupados = new Map<string, NearExpirationDTO[]>();

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
