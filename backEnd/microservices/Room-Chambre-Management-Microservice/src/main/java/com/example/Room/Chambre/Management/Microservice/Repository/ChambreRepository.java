package com.example.Room.Chambre.Management.Microservice.Repository;

import com.example.Room.Chambre.Management.Microservice.Entities.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChambreRepository  extends JpaRepository<Chambre, Long> {
}
