export interface Reservation {
    id: number;
    studentId: number;
    dateReservation: Date | null; 
    statut: ReservationStatus;
  }
  
  export type ReservationStatus = 'En attente' | 'Accepté' | 'Refusé';