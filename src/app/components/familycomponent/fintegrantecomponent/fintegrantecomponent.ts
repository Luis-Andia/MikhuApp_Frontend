import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { userlistDTO } from '../../../models/UserlistDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Familyservice } from '../../../services/familyservice';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Menuadmincomponent } from '../../menuadmincomponent/menuadmincomponent';
import { RouterLink } from '@angular/router';


@Component({
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, Menuadmincomponent, RouterLink],
  selector: 'app-fintegrantecomponent',
  styleUrl: './fintegrantecomponent.css',
  templateUrl: './fintegrantecomponent.html',
})
export class Fintegrantecomponent {
  idfamily:any = null
  mensaje:string=''
  displayedColumns:string[]=['C1', 'C2', 'C3']
  dataSource = new MatTableDataSource<userlistDTO>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private fS:Familyservice, private cdr:ChangeDetectorRef, private route:ActivatedRoute){}

  ngOnInit():void{
    this.idfamily = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.idfamily);

    if (this.idfamily > 0) {
      this.obtenerIntegrantes();
    }
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  obtenerIntegrantes(){
      this.fS.getintegrantes(this.idfamily).subscribe({
        next:data => {
          this.dataSource.data = data
          this.cdr.detectChanges()
        }, error(err) {
          console.log('Ocurrio un error al listar los integrantes')    
        }
    })
  }

  eliminarintegrante(id:number){
    this.fS.deleteintegrante(id).subscribe({
      next:()=>{
        this.obtenerIntegrantes()
        this.cdr.detectChanges()
      }, error(err){
        console.log('Ocurrio un error al eliminar el integrante')    
      }
    })
  }
}
