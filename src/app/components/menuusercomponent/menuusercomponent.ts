import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';
@Component({
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, RouterLink],
  selector: 'app-menuusercomponent',
  styleUrl: './menuusercomponent.css',
  templateUrl: './menuusercomponent.html',
})
export class Menuusercomponent {}
