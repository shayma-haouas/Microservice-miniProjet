package com.example.gestion_reservation;

import com.example.gestion_reservation.Reservation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /*@PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        return ResponseEntity.ok(reservationService.createReservation(reservation));
    }*/
    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        // Ici, l'ID de l'utilisateur est déjà inclus dans la requête
        Reservation saved = reservationService.createReservation(reservation);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservation(@PathVariable int id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<Reservation> updateStatus(
            @PathVariable int id,
            @RequestParam String newStatus
    ) {
        return ResponseEntity.ok(reservationService.updateReservationStatus(id, newStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<ReservationDTO> getReservationWithUser(@PathVariable int id) {
        ReservationDTO dto = reservationService.getReservationWithUser(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/by-username/{username}")
    public List<Reservation> getReservationsByUsername(@PathVariable String username) {
        return reservationService.findByUsername(username);
    }




}