import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

  @Component({
  selector: 'app-itemcomponent',
  imports: [Menucomponent,RouterOutlet],
  templateUrl: './itemcomponent.html',
  styleUrl: './itemcomponent.css',
})

export class Itemcomponent {}
