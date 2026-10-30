import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from './components/menucomponent/menucomponent';
@Component({
  imports: [RouterOutlet, Menucomponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MikhuApp_Frontend');
}
