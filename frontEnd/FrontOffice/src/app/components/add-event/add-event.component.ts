import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, Event } from 'src/app/Services/event.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  event: Event = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    email: '' // 👈 assure-toi que ton interface Event dans event.service.ts contient bien ce champ !
  };

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const email = this.authService.getUserEmailFromToken();
    if (email) {
      this.event.email = email; // 👈 on injecte l'email dans l'objet event
      this.eventService.addEvent(this.event).subscribe({
        next: (response) => {
          alert('Événement ajouté avec succès');
          this.router.navigate(['/eventlist']);
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l\'ajout de l\'événement');
        }
      });
    } else {
      alert('Utilisateur non authentifié ou token invalide.');
    }
  }
}
