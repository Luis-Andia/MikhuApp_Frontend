import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-familycomponent',
  styleUrl: './familycomponent.css',
  templateUrl: './familycomponent.html',
})
export class Familycomponent {}
