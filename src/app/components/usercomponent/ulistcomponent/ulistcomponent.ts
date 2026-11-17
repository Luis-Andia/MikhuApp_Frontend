import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { userlistDTO } from '../../../models/UserlistDTO';
import { Userservice } from '../../../services/userservice';

@Component({
  imports: [MatTableModule, MatIconModule],
  selector: 'app-ulistcomponent',
  styleUrl: './ulistcomponent.css',
  templateUrl: './ulistcomponent.html',
})
export class Ulistcomponent {
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5'];
  dataSource: userlistDTO[] = [];

  private uS = inject(Userservice)
  private cdr = inject(ChangeDetectorRef)

  obtenerusers() {
    this.uS.getUsers().subscribe({
      next: (data: userlistDTO[]) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Ocurrió un error al listar los registros!!');
        this.cdr.detectChanges();
      },
    });
  }

  eliminarUser(id: number) {
    this.uS.deleteUser(id).subscribe({
      next: () => {
        this.obtenerusers();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Error al eliminar!!');
        this.cdr.detectChanges();
      },
    });
  }
}
