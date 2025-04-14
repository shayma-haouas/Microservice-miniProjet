export interface Reservation {
  id?: number;
  studentId: number;
  dateReservation: string;
  statut: string;
  username?: string; // ✅ ajoute cette ligne
}
