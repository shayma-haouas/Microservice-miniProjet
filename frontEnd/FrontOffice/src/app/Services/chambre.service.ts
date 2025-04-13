import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


export interface Chambre {
  idChambre: number;
  image: string;
  numeroChambre: number;
  typeChambre: string;
} 
@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  private baseUrl = 'http://localhost:8021/chambre/all'; 

  constructor(private http: HttpClient) {}

  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.baseUrl);
  }
}

