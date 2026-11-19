import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-rolcomponent',
  styleUrl: './rolcomponent.css',
  templateUrl: './rolcomponent.html',
})
export class Rolcomponent {}
