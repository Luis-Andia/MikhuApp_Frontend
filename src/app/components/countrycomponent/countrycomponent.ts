import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent, RouterOutlet],
  selector: 'app-countrycomponent',
  styleUrl: './countrycomponent.css',
  templateUrl: './countrycomponent.html',
})
export class Countrycomponent {}