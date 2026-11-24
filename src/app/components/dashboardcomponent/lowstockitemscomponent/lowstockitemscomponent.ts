import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LowStockItemsDTO } from '../../../models/LowStockItemsDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { Itemservice } from '../../../services/itemservice';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { Userservice } from '../../../services/userservice';
import { Loginservice } from '../../../services/loginservice';


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
        
        this.bajoStock(this.idFamily);

      },
      error: (err) => {
        console.log('Error al obtener la información del usuario logueado');
      },
    });

  }
  bajoStock(idFamilia: number): void {

    this.iS.getlowStockitems(idFamilia).subscribe({
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
