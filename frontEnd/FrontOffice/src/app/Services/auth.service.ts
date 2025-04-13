import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:9090/api/auth';

interface DecodedToken {
  email: string;
  // tu peux aussi ajouter d'autres champs ici si tu veux (sub, name, exp, etc.)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Inscription
  signup(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, userData, { responseType: 'text' });
  }

  // Connexion
  signin(credentials: any): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials);
  }

  // Vérification de l'email
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${API_URL}/verify?token=${token}`);
  }

  // Stockage du token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Récupération du token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Suppression du token (logout)
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // Décodage du token pour récupérer l'email
  getUserEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.email;
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  }


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
