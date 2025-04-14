import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bloc } from 'src/app/models/bloc';  // Adjust according to your file structure
import { foyer } from 'src/app/models/foyer';  // Adjust according to your file structure

@Component({
  selector: 'app-ajouterbloc',
  templateUrl: './ajouterbloc.component.html',
  styleUrls: ['./ajouterbloc.component.css']
})
export class AjouterblocComponent implements OnInit {
  bloc: bloc = {
    nomBloc: '',
    capaciteBloc: 0,
    foyer: {} as foyer 
  };

  foyers: foyer[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFoyers();
  }

  loadFoyers(): void {
    this.http.get<foyer[]>('http://localhost:8089/miniprojet/foyer/retrievefoyer').subscribe({
      next: data => this.foyers = data,
      error: err => console.error('Erreur lors du chargement des foyers :', err)
    });
  }

  ajouterbloc(): void {
    // Assign foyer with id = 1 before sending
    this.bloc.foyer = { idfoyer: 1, nomFoyer: 'foyer menzah 7', capaciteFoyer: 0, statut: '' };
  
    this.http.post('http://localhost:8089/miniprojet/bloc/addbloc', this.bloc).subscribe({
      next: () => {
        alert('Bloc ajouté avec succès!');
        this.bloc = { nomBloc: '', capaciteBloc: 0, foyer: {} as foyer }; // reset form
      },
      error: (err) => {
        console.error('Erreur ajout bloc:', err);
        alert('Erreur lors de l\'ajout du bloc');
      }
    });
  }
  
  
}
