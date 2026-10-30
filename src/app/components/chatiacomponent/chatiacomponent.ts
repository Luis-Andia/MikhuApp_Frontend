import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chatiaservice } from '../../services/chatiaservice';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDividerModule ],
  selector: 'app-chatiacomponent',
  styleUrl: './chatiacomponent.css',
  templateUrl: './chatiacomponent.html',
})
export class Chatiacomponent {
  consulta:string = ''
  respuesta:any=null
  mensaje:string=''

  constructor(private caiS:Chatiaservice, private cdr:ChangeDetectorRef){}

  // Metodo para obtener la consulta y ejecutar el metodo del servicio
  obtenerConsulta():void {
    if(!this.consulta.trim()){ // Si la consulta esta vacia o solo con "", entonces ...
      this.mensaje = 'Ingrese una consulta valida!'
      this.respuesta = null
      return
    }

    this.mensaje='Consultando al chef...'
    this.respuesta=null

    this.caiS.postRequestRecipe(this.consulta).subscribe({
      next:(data) => {
        this.respuesta = data.candidates[0].content.parts[0].text
        this.mensaje=''
        this.cdr.detectChanges()
      }, error:(err) => {
        console.log("Error en la API:", err)
        this.respuesta = null
        this.mensaje='Error al procesar la consulta'
        
      },


    })


  }

}
