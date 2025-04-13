package com.example.gestion_reservation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserClient userClient;
    public ReservationService(ReservationRepository reservationRepository, UserClient userClient) {
        this.reservationRepository = reservationRepository;
        this.userClient = userClient;
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation getReservationById(int id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation non trouvée"));
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation updateReservationStatus(int id, String newStatus) {
        Reservation reservation = getReservationById(id);
        reservation.setStatut(newStatus);
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(int id) {
        reservationRepository.deleteById(id);
    }


    public ReservationDTO getReservationWithUser(int reservationId) {
        try {
            Reservation reservation = reservationRepository.findById(reservationId)
                    .orElseThrow(() -> new RuntimeException("Reservation not found"));

            System.out.println("Reservation found: " + reservation);

            UserEntity user = userClient.getUserById(reservation.getStudentId());
            System.out.println("User retrieved: " + user);

            return new ReservationDTO(reservation, user);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la récupération de la réservation ou de l'utilisateur.");
        }
    }

    public List<Reservation> findByUsername(String username) {
        return reservationRepository.findByUsername(username);
    }

}