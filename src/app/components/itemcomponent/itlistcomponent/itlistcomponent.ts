import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemDTO } from '../../../models/ItemDTO';
import { Itemservice } from '../../../services/itemservice';
import { inject } from '@angular/core';
import { Userservice } from '../../../services/userservice';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Loginservice } from '../../../services/loginservice';
import { Ilistusercomponent } from '../ilistusercomponent/ilistusercomponent';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { Ingredientservice } from '../../../services/ingredientservice';
import { IngredientDTO } from '../../../models/IngredientDTO';

@Component({
  imports: [MatTableModule, MatTableModule, MatIconModule, RouterLink, MatPaginator, MatPaginatorModule, MatButtonModule, Ilistusercomponent, MatSnackBarModule, MatDialogModule],
  selector: 'app-itlistcomponent',
  styleUrl: './itlistcomponent.css',
  templateUrl: './itlistcomponent.html',
})

export class Itlistcomponent implements OnInit{
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4','C5', 'C6', 'C7', 'C8', 'C9']
  dataSource = new MatTableDataSource<ItemDTO>([])
  ingredientes:IngredientDTO[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>;

  private iS = inject(Itemservice)
  private cdr = inject(ChangeDetectorRef)
  private loginService = inject(Loginservice)
  private sB = inject(MatSnackBar)
  private dg = inject(MatDialog);
  private inS = inject(Ingredientservice)

  ngOnInit(): void {
    this.obtenerItems()
    this.obteneringredientes()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  obtenerItems() {
        this.iS.getItems().subscribe({ // Buscar los items de la familia del usuario
        next: data => {
          this.dataSource.data = data;
          this.cdr.detectChanges();
        },
        error:err => {
          console.log('Ocurrió un error al listar los ítems de la familia');
          this.cdr.detectChanges();
        }
        });
      }
  
  obteneringredientes(){
    this.inS.getIngredient().subscribe({
      next:data => {
        this.ingredientes = data
        this.cdr.detectChanges()
      }, error:err=>{
        console.log("Ocurrio un error al listar los ingredientes")
      }
    })
  }

  eliminarItem(id: number) {

    const dialogRef = this.dg.open(this.dialogEliminar, {
    width: '420px',
    maxWidth: '90vw',
    disableClose: true,
    autoFocus: false
    });

    dialogRef.afterClosed().subscribe(confirmado => {

    if (confirmado) {
      this.iS.deleteItem(id).subscribe({
        next: () => {
          this.obtenerItems();

          this.sB.open(
            'Item eliminado correctamente.',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['mensaje-exito']
            }
          );
        },
        error: (err) => {
          console.error('Error al eliminar:', err);

          this.sB.open(
            'No se puede eliminar este Item porque está relacionado con otro registro.',
            'Cerrar',
            {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['mensaje-error']
            }
          );
        }
      });
    }

  });
  }

  // Roles
  // Comprobar si es administrador
  get esAdmin(): boolean {
    return this.loginService.hasAnyRole(['ADMIN']);
  }

  // Comprobar si es miembro de familia
  get esMiembro(): boolean {
    return this.loginService.hasAnyRole(['MEMBER']);
  }

    // Comprobar si es invitado
  get esInvitado(): boolean {
    return this.loginService.hasAnyRole(['GUEST']);
  }
 
  // Comprobar si es moderador de una familia
  get esModerador(): boolean {
    return this.loginService.hasAnyRole(['MODERATOR']);
  }
}
