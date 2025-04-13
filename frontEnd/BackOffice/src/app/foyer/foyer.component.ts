import { Component, OnInit } from '@angular/core';
import { FoyerService } from '../services/servicefoyer.service';
import { foyer } from '../models/foyer';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent implements OnInit {
  foyers: any[] = [];

  constructor(private foyerService: FoyerService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadFoyers();
  }

  loadFoyers(): void {
    this.foyerService.getAllFoyers().subscribe({
      next: data => this.foyers = data,
      error: err => console.error('Erreur de chargement des foyers:', err)
    });
  }
  deleteFoyer(idFoyer: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce foyer ?');
    if (confirmDelete) {
      // Call API to delete the foyer
      this.http.delete(`http://localhost:8089/miniprojet/foyer/deletefoyer/${idFoyer}`).subscribe({
        next: () => {
          alert('Foyer supprimé avec succès!');
          this.loadFoyers(); // Reload the foyers list after deletion
        },
        error: err => {
          console.error('Erreur lors de la suppression du foyer:', err);
          alert('Erreur lors de la suppression du foyer');
        }
      });
    }
  }

  // Modify Foyer Method (this could open a modal or a form to modify the foyer)
  editFoyer(foyer: foyer): void {
    alert(`Modifier le foyer: ${foyer.nomFoyer}`);
    // Implement logic to edit the foyer
  }

}

