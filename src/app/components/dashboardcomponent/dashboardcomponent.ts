import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { Ingredconsumglobalcomponent } from './ingredconsumglobalcomponent/ingredconsumglobalcomponent';
import { Ingredconsumdateglobalcomponent } from './ingredconsumdateglobalcomponent/ingredconsumdateglobalcomponent';


interface AlimentoPorConsumir {
  nombre: string;
  fecha: string;
  cantidad: number;
  estado: 'Por vencer' | 'Vencido';
}

interface AlimentoConsumido {
  nombre: string;
  cantidad: number;
  porcentaje: number;
}

interface AlimentoPorReponer {
  nombre: string;
  cantidadActual: number;
  cantidadMinima: number;
  porcentaje: number;
}

@Component({
  selector: 'app-dashboardcomponent',
  standalone: true,
  imports: [
    Menuadmincomponent,
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    Ingredconsumglobalcomponent,
    Ingredconsumdateglobalcomponent
],
  templateUrl: './dashboardcomponent.html',
  styleUrl: './dashboardcomponent.css'
})
export class Dashboardcomponent {

  // Datos de bienvenida de demostración
  nombreUsuario = 'Bianzel';
  nombreFamilia = 'Familia Torres';

  // Indicadores principales
  indicadores = [
    {
      titulo: 'Alimentos en inventario',
      cantidad: 24,
      icono: 'kitchen',
      clase: 'indicador-verde'
    },
    {
      titulo: 'Por vencer en 3 días',
      cantidad: 3,
      icono: 'schedule',
      clase: 'indicador-amarillo'
    },
    {
      titulo: 'Vencidos',
      cantidad: 2,
      icono: 'warning',
      clase: 'indicador-rojo'
    },
    {
      titulo: 'Con bajo stock',
      cantidad: 4,
      icono: 'inventory',
      clase: 'indicador-azul'
    }
  ];

  // Alimentos que requieren atención
  alimentosPorConsumir: AlimentoPorConsumir[] = [
    {
      nombre: 'Leche',
      fecha: '03/11/2026',
      cantidad: 2,
      estado: 'Por vencer'
    },
    {
      nombre: 'Pollo',
      fecha: '31/10/2026',
      cantidad: 1,
      estado: 'Vencido'
    },
    {
      nombre: 'Tomate',
      fecha: '04/11/2026',
      cantidad: 5,
      estado: 'Por vencer'
    },
    {
      nombre: 'Queso fresco',
      fecha: '30/10/2026',
      cantidad: 1,
      estado: 'Vencido'
    }
  ];

  // Alimentos más consumidos
  alimentosConsumidos: AlimentoConsumido[] = [
    { nombre: 'Arroz', cantidad: 12, porcentaje: 100 },
    { nombre: 'Huevos', cantidad: 9, porcentaje: 75 },
    { nombre: 'Papa amarilla', cantidad: 7, porcentaje: 58 },
    { nombre: 'Cebolla roja', cantidad: 6, porcentaje: 50 },
    { nombre: 'Pollo', cantidad: 5, porcentaje: 42 }
  ];

  // Alimentos que necesitan reposición
  alimentosPorReponer: AlimentoPorReponer[] = [
    {
      nombre: 'Aceite vegetal',
      cantidadActual: 1,
      cantidadMinima: 2,
      porcentaje: 50
    },
    {
      nombre: 'Sal de cocina',
      cantidadActual: 1,
      cantidadMinima: 2,
      porcentaje: 50
    },
    {
      nombre: 'Ajo',
      cantidadActual: 2,
      cantidadMinima: 5,
      porcentaje: 40
    },
    {
      nombre: 'Lentejas',
      cantidadActual: 1,
      cantidadMinima: 3,
      porcentaje: 33
    }
  ];

  abrirAsistente(): void {
    // La navegación al asistente se realiza mediante el enlace del HTML.
  }
}
