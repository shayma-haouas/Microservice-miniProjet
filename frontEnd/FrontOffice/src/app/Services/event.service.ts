import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  email?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  addEvent(event: Event): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, event);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/get`);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/getbyid${id}`);
  }

  createEvent(event: Event): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, event);
  }

  updateEvent(id: number, event: Event): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete${id}`);
  }

  generateQRCode(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/generate-qrcode/${id}`);
  }

  getEventsByUserId(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getbyuser/${userId}`);
  }

  getEventsByUserEmail(email: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/getbyemail/${email}`);
  }
}
 