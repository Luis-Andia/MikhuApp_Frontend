import { ChangeDetectorRef, Component } from '@angular/core';
import { Ingredientservice } from '../../../services/ingredientservice';

@Component({
  imports: [],
  selector: 'app-iinsertcomponent',
  styleUrl: './iinsertcomponent.css',
  templateUrl: './iinsertcomponent.html',
})
export class Iinsertcomponent {
  constructor(private iS: Ingredientservice, private cdr: ChangeDetectorRef){}

  registrarIngrediente(){
    
  }
}
