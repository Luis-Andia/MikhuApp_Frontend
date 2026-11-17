import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-consumptioncomponent',
  styleUrl: './consumptioncomponent.css',
  templateUrl: './consumptioncomponent.html',
})
export class Consumptioncomponent {}
