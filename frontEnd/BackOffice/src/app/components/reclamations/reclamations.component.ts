import { Component, OnInit } from '@angular/core';
import { ReclamationsService } from '../../services/reclamations.service'; // adapte le chemin si besoin
import { MatDialog } from '@angular/material/dialog';
import { ReponseComponent } from '../reponse/reponse.component'; // adapte aussi ce chemin

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  reclamations: any[] = [];

  constructor(
    private reclamationsService: ReclamationsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationsService.getAllReclamations().subscribe(
      (data) => {
        this.reclamations = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des réclamations:', error);
      }
    );
  }

  deleteReclamation(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette réclamation ?')) {
      this.reclamationsService.deleteReclamation(id).subscribe(
        () => {
          alert('Réclamation supprimée avec succès !');
          this.loadReclamations();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la réclamation:', error);
        }
      );
    }
  }

  ouvrirDialog(reclamationId: number): void {
    const dialogRef = this.dialog.open(ReponseComponent , {
      width: '400px',
      data: { reclamationId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadReclamations();
      }
    });
  }
}
