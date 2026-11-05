import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { Chatiacomponent } from '../chatiacomponent/chatiacomponent';

@Component({
  imports: [Menucomponent],
  selector: 'app-homecomponent',
  styleUrl: './homecomponent.css',
  templateUrl: './homecomponent.html',
})
export class Homecomponent {}
