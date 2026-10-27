import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent, RouterOutlet],
  selector: 'app-ingredientcomponent',
  styleUrl: './ingredientcomponent.css',
  templateUrl: './ingredientcomponent.html',
})
export class Ingredientcomponent {}
