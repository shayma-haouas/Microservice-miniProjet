package com.example.gestion_reservation;

import lombok.Data;

// UserEntity.java dans gestion_reservation.dto
@Data
public class UserEntity {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private boolean emailVerified;
    private String role;
}
