import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Chatiaservice } from '../../services/chatiaservice';
import { RecommendationDTO } from '../../models/RecommendationDTO';
import { FamilyInventoryDTO } from '../../models/FamilyInventoryDTO';
@Component({
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  selector: 'app-recommendationiacomponent',
  styleUrl: './recommendationiacomponent.css',
  templateUrl: './recommendationiacomponent.html',
})
export class Recommendationiacomponent implements OnInit {

  private ia = inject(Chatiaservice);
  private cdr = inject(ChangeDetectorRef);
  items = inject<FamilyInventoryDTO[]>(MAT_DIALOG_DATA);

  recommendations: RecommendationDTO[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this.ia.postRecommendations(this.items).subscribe({
      next: data => {
        this.recommendations = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
