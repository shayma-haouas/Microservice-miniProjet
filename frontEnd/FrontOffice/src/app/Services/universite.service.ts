import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universite } from '../Universite-Microservice/universite.model';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  private apiUrl = 'http://localhost:8077/universites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/get`);
  }

  getOne(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.apiUrl}/${id}`);
  }

  create(univ: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${this.apiUrl}/createUniversite`, univ);
  }

  update(id: number, univ: Universite): Observable<Universite> {
    return this.http.put<Universite>(`${this.apiUrl}/update/${id}`, univ);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
