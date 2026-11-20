
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
import { Menuadmincomponent } from './components/menuadmincomponent/menuadmincomponent';
import { Loginservice } from './services/loginservice';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MikhuApp_Frontend'); 
}
