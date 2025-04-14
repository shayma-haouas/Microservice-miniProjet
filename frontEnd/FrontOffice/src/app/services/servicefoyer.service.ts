import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { foyer } from '../models/foyer';
import { bloc } from '../models/bloc';
import { map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoyerService {  // Updated service name to FoyerService
  private apiUrl = `http://localhost:8089/miniprojet/foyer`;
  private bloc = 'http://localhost:8089/miniprojet/bloc/retrievebloc'; // Updated API URL for blocs

  constructor(private http: HttpClient) { }

  // Add new foyer
  addFoyer(foyer: foyer): Observable<foyer> {  // Updated method name to camelCase
    return this.http.post<foyer>(`${this.apiUrl}/addfoyer`, foyer);
  }

  // Get all foyers
  getAllFoyers(): Observable<foyer[]> {  // Updated method name to camelCase
    return this.http.get<foyer[]>(`${this.apiUrl}/retrievefoyer`);
  }

  // Get foyer by ID
  getFoyerById(id: number): Observable<foyer> {  // Updated method name to camelCase
    return this.http.get<foyer>(`${this.apiUrl}/retrievefoyer/${id}`);
  }

  // Update foyer
  updateFoyer(foyer: foyer): Observable<foyer> {  // Updated method name to camelCase
    return this.http.put<foyer>(`${this.apiUrl}/updatefoyer`, foyer);
  }

  // Delete foyer
  deleteFoyer(id: number): Observable<void> {  // Updated method name to camelCase
    return this.http.delete<void>(`${this.apiUrl}/deletefoyer/${id}`);
  }

  // Add bloc to foyer
  addBlocToFoyer(idfoyer: number, idBloc: number): Observable<void> {  // Updated method name to camelCase
    return this.http.post<void>(`${this.apiUrl}/setblocs`, null, {
      params: {
        idfoyer: idfoyer.toString(),
        idBloc: idBloc.toString()
      }
    });
  }
  getAllblocs(): Observable<bloc[]> {
    return this.http.get<bloc[]>(this.bloc);
  }
  getFoyersWithBlocs(): Observable<foyer[]> {
    return this.getAllFoyers().pipe(
      switchMap((foyers: foyer[]) => {
        return this.getAllblocs().pipe(
          map((blocs: bloc[]) => {
            return foyers.map((f) => ({
              ...f,
              blocs: blocs.filter(b => b.foyer?.idfoyer === f.idfoyer)
            }));
          })
        );
      })
    );
  }
  
}
