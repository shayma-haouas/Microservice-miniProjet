import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bloc } from '../models/bloc';
import { foyer } from '../models/foyer'; // Import the foyer model

@Injectable({
  providedIn: 'root'
})
export class blocfoyerService {

  private apiUrl = 'http://localhost:8089/miniprojet/bloc'; // Updated API URL
  private foyerUrl = 'http://localhost:8089/miniprojet/foyer/retrievefoyer'; // Foyer API URL

  constructor(private http: HttpClient) { }

  // Fetch all blocs
  getAllblocs(): Observable<bloc[]> {
    return this.http.get<bloc[]>(this.apiUrl);
  }
  

  // Fetch a single bloc by ID
  getblocById(id: number): Observable<bloc> {
    return this.http.get<bloc>(`${this.apiUrl}/${id}`);
  }

  // Add a new bloc
  addbloc(bloc: bloc): Observable<bloc> {
    return this.http.post<bloc>(this.apiUrl, bloc);
  }

  // Update an existing bloc
  updatebloc(id: number, bloc: bloc): Observable<bloc> {
    return this.http.put<bloc>(`${this.apiUrl}/${id}`, bloc);
  }

  // Delete a bloc
  deletebloc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAllFoyers(): Observable<foyer[]> {
    return this.http.get<foyer[]>(this.foyerUrl);
  }
}
