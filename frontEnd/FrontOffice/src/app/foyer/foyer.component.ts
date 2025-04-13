import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class FoyerComponent implements OnInit {
  foyers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFoyers();
  }

  loadFoyers(): void {
    this.http.get<any[]>('http://localhost:8089/foyer/retrievefoyer').subscribe({
      next: data => this.foyers = data,
      error: err => console.error('Erreur de chargement des foyers:', err)
    });
  }
}
