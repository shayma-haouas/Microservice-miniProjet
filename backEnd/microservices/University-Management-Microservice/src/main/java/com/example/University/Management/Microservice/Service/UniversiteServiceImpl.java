package com.example.University.Management.Microservice.Service;


import com.example.University.Management.Microservice.Entities.Universite;
import com.example.University.Management.Microservice.Repository.UniversiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversiteServiceImpl implements IUniversiteService {

    private final UniversiteRepository universiteRepository;

    public UniversiteServiceImpl(UniversiteRepository universiteRepository) {
        this.universiteRepository = universiteRepository;
    }

    @Override
    public Universite ajouterUniversite(Universite universite) {
        return universiteRepository.save(universite);
    }

    @Override
    public List<Universite> afficherUniversites() {
        return universiteRepository.findAll();
    }

    @Override
    public Universite modifierUniversite(Long id, Universite universite) {
        return universiteRepository.findById(id)
                .map(u -> {
                    u.setNomUniversite(universite.getNomUniversite());
                    u.setAdresse(universite.getAdresse());
                    return universiteRepository.save(u);
                }).orElse(null);
    }

    @Override
    public void supprimerUniversite(Long id) {
        universiteRepository.deleteById(id);
    }
}
