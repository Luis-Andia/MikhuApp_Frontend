import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Countryservice } from '../../../services/countryservice';
import { CountryDTO } from '../../../models/CountryDTO';

@Component({
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-coupdatecomponent',
  styleUrl: './coupdatecomponent.css',
  templateUrl: './coupdatecomponent.html',
})
export class Coupdatecomponent implements OnInit {
  idCountry:any = null
  formulario:any
  mensaje:string = ''

  constructor(private coS:Countryservice, private cdr:ChangeDetectorRef, private fb:FormBuilder, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.idCountry = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.idCountry || isNaN(this.idCountry)) {
      this.mensaje = 'ID inválido'
      return
    }

    this.formulario = this.fb.group({
      id:[this.idCountry],
      codigo:['', Validators.required],
      nombre:['', Validators.required]
    })

    this.buscarporId()
  }

  // BUSCAR POR ID
  buscarporId():void {
    this.coS.listId(this.idCountry).subscribe({
      next:(data:CountryDTO) => {
        this.formulario.patchValue({
          id:data.idCountry,
          codigo:data.codCountry,
          nombre:data.nomCountry
        })
      },
      error:(error) => {
        console.error('Error al buscar el país', error)
        this.mensaje = 'No se encontró el país'
      }
    })
  }

  // ACTUALIZAR PAIS
  actualizarPais():void {
    if (this.formulario.invalid) {
      this.mensaje = 'Los campos son obligatorios'
      return
    }

    const dto:CountryDTO = {
      idCountry:this.formulario.value.id,
      codCountry:this.formulario.value.codigo,
      nomCountry:this.formulario.value.nombre
    }

    this.coS.updatecountry(dto).subscribe({
      next: () => {
        this.mensaje = 'País actualizado correctamente'
        this.cdr.detectChanges()
        this.router.navigate(['/pais/listar'])
      },
      error: (error) => {
        console.error(error)
        this.mensaje = 'Error al actualizar el país'
      }
    })
  }
}