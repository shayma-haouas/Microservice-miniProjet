package com.example.gestion_reservation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    private LocalDate dateReservation;

    private String statut = "PENDING";

    @Column(name = "username") // ✅ Ajout du champ username
    private String username;

    @PrePersist
    protected void onCreate() {
        dateReservation = LocalDate.now();
    }
}