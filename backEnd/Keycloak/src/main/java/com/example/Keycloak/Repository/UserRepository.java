package com.example.Keycloak.Repository;


import com.example.Keycloak.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<com.example.Keycloak.entity.UserEntity, Long> {
    // Ajoutez des méthodes de recherche personnalisées au besoin
    UserEntity findByUsername(String username);
}

