import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Familyservice } from '../../../services/familyservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FamilyDTO } from '../../../models/FamilyDTO';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  selector: 'app-fupdatecomponent',
  styleUrl: './fupdatecomponent.css',
  templateUrl: './fupdatecomponent.html',
})
export class Fupdatecomponent implements OnInit{
  idfamily:any = null
  formulario:any
  mensaje:string=''
  hide: boolean = true;
  
  constructor(private fS: Familyservice, private cdr:ChangeDetectorRef, private fb:FormBuilder, private router:Router, private route:ActivatedRoute){}

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation(); // Evita comportamientos no deseados al hacer clic
  }

  ngOnInit():void{
    // Recuperar ID (importante)
    this.idfamily = Number(this.route.snapshot.paramMap.get('id'));
    
    console.log('ID recibido:', this.idfamily); // Mensaje de verificacion

    if (!this.idfamily || isNaN(this.idfamily)) // Si es null o no es un num, entonces..
    {
      this.mensaje = 'ID inválido';
      return;
    }

    this.formulario=this.fb.group({
      codigo:[this.idfamily],
      nombre:['', Validators.required],
      contrasena:['', Validators.required]
    })

    this.buscarporId();
  }

  // BUSCAR POR ID
  buscarporId():void{
    this.fS.listId(this.idfamily).subscribe({
      next:(data:FamilyDTO) => {
        console.log("Familia encontrada: ", data) // Verificacion 2

        this.formulario.patchValue({ // Actualiza los campos del formulario con los valores que trajo el servidor
          codigo:data.idFamily,
          nombre:data.nomFamily,
          contrasena:data.passwordFamily
        })

      }, error:(error) => {
        console.error('Error al buscar la familia', error);
        this.mensaje = 'No se encontró la familia';
      },
    })
  }

  // ACTUALIZAR FAMILIA
  actualizarfamilia():void {
    const dto = { // Se crea un dto para reemplzar
      idFamily:this.formulario.value.codigo,
      nomFamily:this.formulario.value.nombre,
      passwordFamily:this.formulario.value.contrasena
    }

    this.fS.updatefamily(dto).subscribe({
      next: () => {
        this.mensaje = 'Actualizado correctamente!!';
        this.cdr.detectChanges()
        this.formulario.reset()
        this.router.navigate(['/familia/listar']);
      },
      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
      }
    })
  }
}
