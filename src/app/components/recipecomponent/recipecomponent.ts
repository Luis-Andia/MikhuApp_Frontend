import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-recipecomponent',
  styleUrl: './recipecomponent.css',
  templateUrl: './recipecomponent.html',
})
export class Recipecomponent {}