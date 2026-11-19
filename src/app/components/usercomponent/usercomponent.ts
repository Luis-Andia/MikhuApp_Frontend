import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';

@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-usercomponent',
  styleUrl: './usercomponent.css',
  templateUrl: './usercomponent.html',
})
export class Usercomponent {}
