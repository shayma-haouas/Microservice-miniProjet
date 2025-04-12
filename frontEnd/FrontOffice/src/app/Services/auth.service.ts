import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the URLs for the API endpoints
const API_URL = 'http://localhost:9090/api/auth'; // Adaptez l'URL en fonction de votre configuration (URL de votre API)

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Méthode pour l'inscription
  signup(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, userData, { responseType: 'text' });
  }
  

  // Méthode pour la connexion
  signin(credentials: any): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials);
  }
  

  // Méthode pour vérifier l'email
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${API_URL}/verify?token=${token}`);
  }

  // Méthode pour stocker le token JWT dans le localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Méthode pour récupérer le token JWT depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Méthode pour supprimer le token JWT du localStorage (déconnexion)
  removeToken(): void {
    localStorage.removeItem('authToken');
  }
}
