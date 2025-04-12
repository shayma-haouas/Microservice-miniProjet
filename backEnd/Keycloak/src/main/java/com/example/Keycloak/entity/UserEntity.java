package com.example.Keycloak.entity;




import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Vous pouvez éventuellement utiliser une clé unique pour le username ou l'email
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "email_verified")
    private boolean emailVerified;

    // Vous pouvez aussi ajouter d'autres champs : rôle, date d'inscription, etc.
    private String role;
}
