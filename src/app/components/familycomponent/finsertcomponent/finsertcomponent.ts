import { ChangeDetectorRef, Component } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FamilyDTO } from '../../../models/FamilyDTO';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  selector: 'app-finsertcomponent',
  styleUrl: './finsertcomponent.css',
  templateUrl: './finsertcomponent.html',
})
export class Finsertcomponent {
  family:FamilyDTO = {
    nomFamily:'',
    passwordFamily:''
  }
  mensaje:string=''
  constructor(private fS:Familyservice, private cdr:ChangeDetectorRef){}

  registrarFamilia(){
    this.fS.postfamily(this.family).subscribe({
      next:data => {
        this.family = data
        this.cdr.detectChanges()
      }, error:(err) => {
        console.log('Ocurrio un error')
        this.mensaje='Error al registrar'
      },
    })
  }
}
