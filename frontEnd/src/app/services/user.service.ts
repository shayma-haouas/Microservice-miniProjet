import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:8088/api/users'; // URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les utilisateurs
  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/get`, { headers });
  }

  // Méthode pour accepter un utilisateur
  acceptUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/accept/${userId}`, {}, { headers }).pipe(
        catchError((error) => {
            console.error('Erreur lors de l\'acceptation de l\'utilisateur:', error);
            return throwError(error);
        })
    );
}


  // Méthode pour bloquer un utilisateur
  blockUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/block/${userId}`, {}, { headers }).pipe(
        catchError((error) => {
            console.error('Erreur lors du blocage de l\'utilisateur:', error);
            return throwError(error);
        })
    );
}

// Récupérer le profil utilisateur
getUserProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<any>(`${this.apiUrl}/profile`, { headers }).pipe(
    catchError((error) => {
      console.error("Erreur lors de la récupération du profil:", error);
      return throwError(error);
    })
  );
}


}
