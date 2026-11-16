import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';

  @Component({
  selector: 'app-itemcomponent',
  imports: [Menuadmincomponent,RouterOutlet],
  templateUrl: './itemcomponent.html',
  styleUrl: './itemcomponent.css',
})

export class Itemcomponent {}
