package com.example.Keycloak.DTO;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String firstName; // Prénom
    private String lastName;  // Nom de famille
    private String role;

}
