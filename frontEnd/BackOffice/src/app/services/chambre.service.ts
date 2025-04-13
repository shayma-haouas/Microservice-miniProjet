import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


export interface Chambre {
  idChambre: number;
  numeroChambre: number;
  typeChambre: string;
  image?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  private baseUrl = 'http://localhost:8021/chambre'; // Adjust your backend URL

  constructor(private http: HttpClient) {}

  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.baseUrl}/all`);
  }

  addChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(`${this.baseUrl}/add-chambre`, chambre);
  }

  updateChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.put<Chambre>(`${this.baseUrl}/modify-chambre`, chambre);
  }

  deleteChambre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-chambre/${id}`);
  }

  getChambreById(id: number): Observable<Chambre> {
    return this.http.get<Chambre>(`${this.baseUrl}/retrieve-chambre/${id}`);
  }
}