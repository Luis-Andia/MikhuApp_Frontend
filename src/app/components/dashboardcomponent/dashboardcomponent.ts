import { Component} from '@angular/core';
import { Menuadmincomponent } from '../menuadmincomponent/menuadmincomponent';
import { RouterOutlet } from '../../../../node_modules/@angular/router/types/_router_module-chunk';

@Component({
  imports: [Menuadmincomponent, RouterOutlet],
  selector: 'app-dashboardcomponent',
  styleUrl: './dashboardcomponent.css',
  templateUrl: './dashboardcomponent.html',
})
export class Dashboardcomponent{}