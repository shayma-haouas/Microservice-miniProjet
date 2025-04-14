package com.example.Foyer.Bloc.Management.Microservice.Repositories;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Foyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoyerRepository extends JpaRepository<Foyer,Long> {
}
