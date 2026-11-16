import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-countrycomponent',
  styleUrl: './countrycomponent.css',
  templateUrl: './countrycomponent.html',
})
export class Countrycomponent {}