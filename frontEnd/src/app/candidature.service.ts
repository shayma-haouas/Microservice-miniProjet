import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from 'src/app/candidature.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private baseUrl = 'http://localhost:8080/SpringMVC/api/candidatures';

  constructor(private http: HttpClient) { }

  // Get paginated candidatures
  getPaginatedCandidatures(page: number, size: number): Observable<any> {
    // Ajout des paramètres page et size dans l'URL
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get all candidatures (non-paginated)
  getAllCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a candidature by ID
  getCandidature(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new candidature
  createCandidature(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.baseUrl, candidature).pipe(
      catchError(this.handleError)
    );
  }

  // Update candidature status
  updateStatus(id: number, newStatus: string): Observable<Candidature> {
    return this.http.patch<Candidature>(`${this.baseUrl}/${id}/status?newStatus=${newStatus}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a candidature
  deleteCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors from HTTP requests
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.baseUrl);
  }
}
