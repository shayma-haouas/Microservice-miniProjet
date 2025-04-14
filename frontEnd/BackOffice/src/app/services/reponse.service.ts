import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private apiUrl = 'http://localhost:8085/api/reponses'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) {}

  // Envoyer une réponse à une réclamation
  envoyerReponse(reclamationId: number, message: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Authentification
    });

    return this.http.post<any>(`${this.apiUrl}/reclamation/${reclamationId}`, { message }, { headers });
  }

}
