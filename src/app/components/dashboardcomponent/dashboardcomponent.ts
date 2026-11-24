import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { Ingredconsumglobalcomponent } from './ingredconsumglobalcomponent/ingredconsumglobalcomponent';
import { Ingredconsumdateglobalcomponent } from './ingredconsumdateglobalcomponent/ingredconsumdateglobalcomponent';
import { Loginservice } from '../../services/loginservice';
import { Lowstockitemscomponent } from './lowstockitemscomponent/lowstockitemscomponent';
import { Nearexpirationcomponent } from './nearexpirationcomponent/nearexpirationcomponent';
import { Expiredcomponent } from './expiredcomponent/expiredcomponent';
import { Ingredientavailablecomponent } from './ingredientavailablecomponent/ingredientavailablecomponent';
import { Itemservice } from '../../services/itemservice';

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
    Ingredconsumdateglobalcomponent,
    Lowstockitemscomponent,
    Nearexpirationcomponent,
    Expiredcomponent,
    Ingredientavailablecomponent,
  ],
  templateUrl: './dashboardcomponent.html',
  styleUrl: './dashboardcomponent.css',
})
export class Dashboardcomponent implements OnInit {
  private loginService = inject(Loginservice);
  private iS = inject(Itemservice);

  // Usuario que inició sesión
  get nombreUsuario(): string {
    return this.loginService.getUsername() || 'Usuario';
  }

  // Indicadores principales (datos de demostración)
  indicadores = [
    {
      titulo: 'Alimentos en inventario',
      cantidad: 0,
      icono: 'kitchen',
      clase: 'indicador-verde',
    },
    {
      titulo: 'Por vencer en 3 días',
      cantidad: 0,
      icono: 'schedule',
      clase: 'indicador-amarillo',
    },
    {
      titulo: 'Vencidos',
      cantidad: 0,
      icono: 'warning',
      clase: 'indicador-rojo',
    },
    {
      titulo: 'Con bajo stock',
      cantidad: 0,
      icono: 'inventory',
      clase: 'indicador-azul',
    },
  ];

  ngOnInit(): void {
    if (this.esInvitado || this.esMiembro || this.esModerador) {
      this.cargarIndicadores();
    }
  }

  private cargarIndicadores(): void {
    // 1. Alimentos en inventario:
    this.iS.getIngredientAvailable(1).subscribe((items) => {
    this.indicadores[0].cantidad = items.length;
    });

    // 2. Por vencer en 3 días:
    this.iS.getNearExpiration(1).subscribe((lista) => {
      this.indicadores[1].cantidad = lista.length;
    });

    // 3. Vencidos:
    this.iS.getExpired(1).subscribe((lista) => {
    this.indicadores[2].cantidad = lista.length;
    });

    // 4. Con bajo stock:
    this.iS.getlowStockitems(1).subscribe((lista) => {
    this.indicadores[3].cantidad = lista.length;
    });
  }

  abrirAsistente(): void {
    // La navegación se realiza mediante el enlace del HTML.
  }

  // Organizacion por roles
  // Comprobar si es administrador
  get esAdmin(): boolean {
    return this.loginService.hasAnyRole(['ADMIN']);
  }

  // Comprobar si es miembro de familia
  get esMiembro(): boolean {
    return this.loginService.hasAnyRole(['MEMBER']);
  }

  // Comprobar si es invitado
  get esInvitado(): boolean {
    return this.loginService.hasAnyRole(['GUEST']);
  }

  // Comprobar si es moderador de una familia
  get esModerador(): boolean {
    return this.loginService.hasAnyRole(['MODERATOR']);
  }
}
