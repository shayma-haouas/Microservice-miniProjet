import { Component, OnInit } from '@angular/core';
import { EventService, Event } from 'src/app/Services/event.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  qrCodeData: string | null = null;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserEvents();
  }

  loadUserEvents(): void {
    const email = this.authService.getUserEmailFromToken(); // 👈 dynamiquement depuis le token

    if (email) {
      this.eventService.getEventsByUserEmail(email).subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des événements :', err);
        }
      });
    } else {
      console.warn('Email non trouvé dans le token.');
    }
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadUserEvents(); // Recharge après suppression
    });
  }

  generateQRCode(id: number): void {
    this.eventService.generateQRCode(id).subscribe(response => {
      this.qrCodeData = response.qrCodeData;
    });
  }
}
