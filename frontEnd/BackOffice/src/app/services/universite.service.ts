import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Universite {
  idUniversite?: number;
  nomUniversite: string;
  adresse: string;
}

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  private baseUrl = 'http://localhost:8077/universites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.baseUrl}/get`);
  }

  create(universite: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${this.baseUrl}/createUniversite`, universite);
  }

  update(id: number, universite: Universite): Observable<Universite> {
    return this.http.put<Universite>(`${this.baseUrl}/update/${id}`, universite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
