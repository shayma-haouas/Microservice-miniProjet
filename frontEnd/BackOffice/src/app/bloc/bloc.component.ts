import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bloc } from '../models/bloc';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  blocs: bloc[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlocs();
  }

  loadBlocs(): void {
    this.http.get<bloc[]>('http://localhost:8089/miniprojet/bloc/retrievebloc').subscribe({
      next: data => this.blocs = data,
      error: err => console.error('Erreur lors du chargement des blocs :', err)
    });
  }

  deleteBloc(id: number | undefined): void {
    if (!id) return;
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?');
    if (confirmDelete) {
      this.http.delete(`http://localhost:8089/miniprojet/bloc/deleteBloc/${id}`).subscribe({
        next: () => {
          alert('Bloc supprimé avec succès!');
          this.loadBlocs();
        },
        error: err => {
          console.error('Erreur lors de la suppression du bloc :', err);
          alert('Erreur lors de la suppression.');
        }
      });
    }
  }

  editBloc(bloc: bloc): void {
    alert(`Modifier le bloc : ${bloc.nomBloc}`);
    // Tu peux remplacer par une redirection ou ouverture d’un formulaire plus tard
  }
}
