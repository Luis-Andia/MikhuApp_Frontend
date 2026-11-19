
import { Component, OnInit, inject, signal } from '@angular/core';

import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
import { Menuadmincomponent } from './components/menuadmincomponent/menuadmincomponent';
import { Loginservice } from './services/loginservice';

import { Menuadmincomponent } from './components/menuadmincomponent/menuadmincomponent';
import { Loginservice } from './services/loginservice';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  private loginService = inject(Loginservice);

  protected readonly title = signal('MikhuApp_Frontend');

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loginService.validarSesion();
    }
  }
}
