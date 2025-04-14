package com.example.gestion_reservation;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationDTO {
    private Reservation reservation;
    private UserEntity user;
}
