import { ChangeDetectorRef, Component } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyDTO } from '../../../models/FamilyDTO';
import { Loginservice } from '../../../services/loginservice';
import { Userservice } from '../../../services/userservice';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Menuadmincomponent } from '../../menuadmincomponent/menuadmincomponent';
import { Router } from '@angular/router';
import { JoinfamilyDTO } from '../../../models/JoinfamilyDTO';

@Component({
  imports: [MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, Menuadmincomponent],
  selector: 'app-funirfamiliacomponent',
  styleUrl: './funirfamiliacomponent.css',
  templateUrl: './funirfamiliacomponent.html',
})
export class Funirfamiliacomponent {
  formulario:any
  mensaje:string=''
  hide: boolean = true; // Para la contraseña

  constructor(private fS: Familyservice, private cdr: ChangeDetectorRef, private fb:FormBuilder, private lS: Loginservice, private uS:Userservice, private router:Router)
  {
    this.formulario=fb.group({
      nombre:['', Validators.required],
      contrasena:['', Validators.required]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation(); // Evita comportamientos no deseados al hacer clic
  }

  get username(): string {
      return this.lS.getUsername();
  }

  unirsefamilia(){
      if(this.formulario.invalid){
        this.mensaje = 'Los campos son obligatorios'
        return
      }

      const familia:JoinfamilyDTO={
        nomFamily:this.formulario.value.nombre,
        passwordFamily:this.formulario.value.contrasena,
      }
      
      if (!this.username) {
        console.log('No hay un usuario sesión activa');
        return;
      }  

      this.uS.getuserbyusername(this.username).subscribe({
      next:(data:any) =>{
        const idUser = data.idUser
        const idFamily = data.idFamily

        this.fS.joinfamily(idUser, familia).subscribe({
          next:() => {
            this.mensaje = 'Se ha unido correctamente'
            this.router.navigate(['/familia/integrantes',idFamily]);

          }, error:(error) => {
          this.mensaje = 'Credenciales incorrectas. Intentelo de nuevo'
          }
        })
      }
    })
  }
}
