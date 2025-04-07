package com.example.Room.Chambre.Management.Microservice.Repository;

import com.example.Room.Chambre.Management.Microservice.Entities.Chambre;
import com.example.Room.Chambre.Management.Microservice.Entities.TypeChambre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChambreRepository  extends JpaRepository<Chambre, Long> {
    // Ffind room by TYPE
    List<Chambre> findByTypeChambre(TypeChambre typeChambre);
       // find by NUMRoom
    List<Chambre> findByNumeroChambreBetween(Long startNumero, Long endNumero);
}
