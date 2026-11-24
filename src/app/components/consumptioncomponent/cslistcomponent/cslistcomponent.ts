import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ConsumptionDTO } from '../../../models/ConsumptionDTO';
import { Consumptionservice } from '../../../services/consumptionservice';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { Recipeservice } from '../../../services/recipeservice';
import { Itemservice } from '../../../services/itemservice';
import { RecipeDTO } from '../../../models/RecipeDTO';

@Component({
  imports: [
    MatIconModule,
    MatTableModule,
    RouterLink,
    MatPaginator,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  selector: 'app-cslistcomponent',
  styleUrl: './cslistcomponent.css',
  templateUrl: './cslistcomponent.html',
})
export class Cslistcomponent implements OnInit {
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
  dataSource = new MatTableDataSource<ConsumptionDTO>([]);
  recetas: RecipeDTO[] = []

  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private csS = inject(Consumptionservice);
  private cdr = inject(ChangeDetectorRef);
  private sB = inject(MatSnackBar);
  private dg = inject(MatDialog);
  private rS = inject(Recipeservice);
  private iS = inject(Itemservice);

  ngOnInit(): void {
    this.obtenerRecetas();
    this.obtenerConsumos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerConsumos() {
    this.csS.getconsumption().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error al listar los registros!!');
        this.cdr.detectChanges();
      },
    });
  }

  obtenerRecetas(){
    this.rS.getRecipes().subscribe({
      next:data => {
        this.recetas = data
        this.cdr.detectChanges()
      }, error:err => {
        console.log('Ocurrio un error al listar las recetas')
      }
    })
  }

  obtenerNombreReceta(idReceta: number): string {
    return this.recetas.find(receta => receta.idRecipe === idReceta)?.nomRecipe ?? 'Receta no encontrada';
  }

  eliminarConsumos(id: number) {
    const dialogRef = this.dg.open(this.dialogEliminar, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.csS.deleteconsumption(id).subscribe({
          next: () => {
            this.obtenerConsumos();

            this.sB.open('Item eliminado correctamente.', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['mensaje-exito'],
            });
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
                panelClass: ['mensaje-error'],
              },
            );
          },
        });
      }
    });
  }
}
