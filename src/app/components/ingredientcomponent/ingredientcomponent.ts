import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatInputModule, Menuadmincomponent, RouterOutlet, MatIconModule, MatButtonModule],
  selector: 'app-ingredientcomponent',
  styleUrl: './ingredientcomponent.css',
  templateUrl: './ingredientcomponent.html',
})
export class Ingredientcomponent{
}
