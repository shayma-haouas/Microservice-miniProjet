import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planning-dialog',
  templateUrl: './planning-dialog.component.html',
  standalone: true,
  imports: [FormsModule], // Assure-toi que FormsModule est importé
})
export class PlanningDialogComponent {
  nom = '';
  prenom = '';
  email = '';

  constructor(
    public dialogRef: MatDialogRef<PlanningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string }
  ) {}

  submit() {
    const formData = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      date: this.data.date
    };
    console.log('Données envoyées:', formData);
    this.dialogRef.close(formData); // Ferme la boîte de dialogue en renvoyant les données
  }
}
