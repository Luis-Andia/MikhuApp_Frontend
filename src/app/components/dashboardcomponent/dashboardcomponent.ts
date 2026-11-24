import { Component, inject, OnInit, signal } from '@angular/core';
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
import { Userservice } from '../../services/userservice';

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
  private uS = inject(Userservice);
  private idFamily: number = 0;

  // Usuario que inició sesión
  get nombreUsuario(): string {
    return this.loginService.getUsername() || 'Usuario';
  }

  // Indicadores principales (datos de demostración)
  indicadores = signal([
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
  ]);

  ngOnInit(): void {
    this.uS.getuserbyusername(this.nombreUsuario).subscribe({
      next: (data: any) => {
        this.idFamily = data.idFamily;

        if (!this.idFamily) {
          console.log('El usuario no tiene una familia asociada');
        }

        if (this.esInvitado || this.esMiembro || this.esModerador) {
            this.cargarIndicadores(this.idFamily);
        }
      },
      error: (err) => {
        console.log('Error al obtener la información del usuario logueado');
      },
    });
  }
  //cambio

  private actualizarCantidad(indice: number, nuevaCantidad: number): void {
    this.indicadores.update((lista) =>
      lista.map((ind, i) =>
        i === indice ? { ...ind, cantidad: nuevaCantidad } : ind
      )
    );
  }
  // cambio
  private cargarIndicadores(idFamilia: number): void {
    // 1. Alimentos en inventario
    this.iS.getIngredientAvailable(idFamilia).subscribe((items) => {
      this.actualizarCantidad(0, items.length);
    });

    // 2. Por vencer en 3 días
    this.iS.getNearExpiration(idFamilia).subscribe((lista) => {
      this.actualizarCantidad(1, lista.length);
    });

    // 3. Vencidos
    this.iS.getExpired(idFamilia).subscribe((lista) => {
      this.actualizarCantidad(2, lista.length);
    });

    // 4. Con bajo stock
    this.iS.getlowStockitems(idFamilia).subscribe((lista) => {
      this.actualizarCantidad(3, lista.length);
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
