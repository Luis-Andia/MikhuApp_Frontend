
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { Loginservice } from '../../services/loginservice';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-menuadmincomponent',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menuadmincomponent.html',
  styleUrl: './menuadmincomponent.css'
})
export class Menuadmincomponent {

  private loginService = inject(Loginservice);
  private router = inject(Router);

  // Obtener nombre del usuario autenticado
  get nombreUsuario(): string {
    return this.loginService.getUsername() || 'Usuario';
  }

  // Obtener iniciales del usuario
  get inicialesUsuario(): string {
    const nombre = this.nombreUsuario
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .trim();

    if (!nombre) {
      return 'U';
    }

    const palabras = nombre.split(/\s+/);

    if (palabras.length > 1) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }

    return palabras[0].substring(0, 2).toUpperCase();
  }

  // Comprobar si es administrador
  get esAdmin(): boolean {
    return this.loginService.hasAnyRole(['ROLE_ADMIN']);
  }

  // Cerrar sesión
  cerrarSesion(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
