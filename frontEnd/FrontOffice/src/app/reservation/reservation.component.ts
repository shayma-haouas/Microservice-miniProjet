import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Services/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservation: Reservation = {
    studentId: 0,
    dateReservation: '',
    statut: 'PENDING'
  };

  reservations: Reservation[] = [];
  ascendingDate: boolean = true;
  ascendingStatus: boolean = true;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  onSubmit(): void {
    this.reservationService.createReservation(this.reservation).subscribe({
      next: () => {
        alert('✅ Réservation créée avec succès');
        this.reservation = { studentId: 0, dateReservation: '', statut: 'PENDING' };
        this.loadReservations();
      },
      error: (err) => {
        alert('❌ Erreur lors de la création de la réservation');
        console.error(err);
      }
    });
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations', err);
      }
    });
  }

  deleteReservation(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          alert('🗑️ Réservation supprimée');
          this.loadReservations();
        },
        error: (err) => {
          alert('❌ Erreur lors de la suppression');
          console.error(err);
        }
      });
    }
  }

  sortByDate(): void {
    const sorted = [...this.reservations].sort((a, b) => {
      const dateA = new Date(a.dateReservation).getTime();
      const dateB = new Date(b.dateReservation).getTime();
      return this.ascendingDate ? dateA - dateB : dateB - dateA;
    });
    this.reservations = sorted;
    this.ascendingDate = !this.ascendingDate;
  }

  sortByStatus(): void {
    const sorted = [...this.reservations].sort((a, b) => {
      const statusA = a.statut?.toUpperCase() || '';
      const statusB = b.statut?.toUpperCase() || '';

      if (statusA < statusB) return this.ascendingStatus ? -1 : 1;
      if (statusA > statusB) return this.ascendingStatus ? 1 : -1;
      return 0;
    });

    this.reservations = sorted;
    this.ascendingStatus = !this.ascendingStatus;
  }
}
