import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { Rlistcomponent } from './rlistcomponent/rlistcomponent';

@Component({
  imports: [Menucomponent, Rlistcomponent],
  selector: 'app-recipecomponent',
  styleUrl: './recipecomponent.css',
  templateUrl: './recipecomponent.html',
})
export class Recipecomponent {}
