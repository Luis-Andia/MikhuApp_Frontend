
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-menuadmincomponent',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menuadmincomponent.html',
  styleUrl: './menuadmincomponent.css'
  styleUrl: './menuadmincomponent.css'
})
export class Menuadmincomponent {

  private loginService = inject(Loginservice);
  private router = inject(Router);

  // Obtener nombre del usuario autenticado
  get username(): string {
    return this.loginService.getUsername();
  }

  get roles(): string {
    return this.loginService.getRoles().join(', ');
  }

  // Obtener iniciales del usuario
  get inicialesUsuario(): string {
    const nombre = this.username
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .trim();

    if (!nombre) {
      return 'U';}

    const palabras = nombre.split(/\s+/);

    if (palabras.length > 1) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();}
      
    return palabras[0].substring(0, 2).toUpperCase();
  }

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

  // Cerrar sesión
  cerrarSesion(): void {
    this.loginService.logout();
    void this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
