import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from './components/menucomponent/menucomponent';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MikhuApp_Frontend');
}
