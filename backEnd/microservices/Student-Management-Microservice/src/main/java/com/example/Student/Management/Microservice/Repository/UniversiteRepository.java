package com.example.Student.Management.Microservice.Repository;

import com.example.Student.Management.Microservice.Entities.Universite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversiteRepository extends JpaRepository<Universite, Long> {
}