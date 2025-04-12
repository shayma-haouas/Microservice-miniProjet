package com.example.University.Management.Microservice.Service;

import com.example.University.Management.Microservice.Entities.Universite;
import com.example.University.Management.Microservice.Entities.UniversiteDTO;

import java.util.List;

public interface IUniversiteService {
    Universite ajouterUniversite(Universite universite);
    List<Universite> afficherUniversites();
    Universite modifierUniversite(Long id, Universite universite);
    void supprimerUniversite(Long id);

    UniversiteDTO findById(Long id);
}