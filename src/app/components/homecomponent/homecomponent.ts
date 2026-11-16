import { Component } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { Chatiacomponent } from '../chatiacomponent/chatiacomponent';

@Component({
  imports: [Menuadmincomponent],
  selector: 'app-homecomponent',
  styleUrl: './homecomponent.css',
  templateUrl: './homecomponent.html',
})
export class Homecomponent {}
