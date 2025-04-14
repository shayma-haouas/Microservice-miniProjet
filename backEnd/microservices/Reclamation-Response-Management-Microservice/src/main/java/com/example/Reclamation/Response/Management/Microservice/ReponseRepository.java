package com.example.Reclamation.Response.Management.Microservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReponseRepository extends JpaRepository<Reponse, Long> {
    Optional<Reponse> findByReclamation_IdRec(Long idRec); // Trouver réponse par réclamation

}