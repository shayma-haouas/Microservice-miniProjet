import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajouterfoyer',
  templateUrl: './ajouterfoyer.component.html',
  styleUrls: ['./ajouterfoyer.component.css']
})
export class AjouterfoyerComponent {
  foyerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.foyerForm = this.fb.group({
      nomFoyer: ['', Validators.required],
      capacite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.foyerForm.valid) {
      const foyer = this.foyerForm.value;
      this.http.post('http://localhost:8089/miniprojet/foyer/addfoyer', foyer).subscribe({
        next: response => {
          alert('Foyer ajouté avec succès !');
          this.foyerForm.reset();
        },
        error: err => {
          console.error('Erreur lors de l\'ajout du foyer', err);
          alert('Erreur lors de l\'ajout du foyer.');
        }
      });
    }
  }
}
