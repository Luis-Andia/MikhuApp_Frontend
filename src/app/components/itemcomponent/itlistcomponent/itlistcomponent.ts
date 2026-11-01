import { Component } from '@angular/core';
import { Itemservice } from '../../../services/itemservice';
import { Menucomponent } from '../../menucomponent/menucomponent';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  imports: [Menucomponent, MatIconModule, MatTableModule],
  selector: 'app-itlistcomponent',
  styleUrl: './itlistcomponent.css',
  templateUrl: './itlistcomponent.html',
})
export class Itlistcomponent {
  
    constructor(private itS:Itemservice){}

  ngOnInit():void {
    this.obtenerItems()
  }
  // Encontrar forma de como atrapar el id del usuario ----------------------
  obtenerItems():void{

  }

}
