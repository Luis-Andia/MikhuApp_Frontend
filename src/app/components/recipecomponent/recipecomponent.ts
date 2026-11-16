import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { Rlistcomponent } from './rlistcomponent/rlistcomponent';

@Component({
  imports: [Menuadmincomponent, Rlistcomponent],
  selector: 'app-recipecomponent',
  styleUrl: './recipecomponent.css',
  templateUrl: './recipecomponent.html',
})
export class Recipecomponent {}
