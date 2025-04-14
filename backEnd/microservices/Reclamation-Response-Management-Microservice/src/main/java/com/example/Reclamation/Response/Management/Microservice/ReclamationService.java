package com.example.Reclamation.Response.Management.Microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;


    private static final List<String> BAD_WORDS = List.of("mauvaismot1", "mauvaismot2", "mauvaismot3"); // Liste des mots à filtrer

    // Méthode pour remplacer les mots interdits
    private String filterBadWords(String description) {
        for (String badWord : BAD_WORDS) {
            description = description.replaceAll("(?i)" + badWord, "****");
        }
        return description;
    }

    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public Reclamation getReclamationById(Long id) {
        Optional<Reclamation> reclamation = reclamationRepository.findById(id);
        return reclamation.orElse(null);
    }

    public Reclamation createReclamation(Reclamation reclamation) {


        // Filtrer la description de la réclamation
        String filteredDescription = filterBadWords(reclamation.getDescription());
        reclamation.setDescription(filteredDescription);



        // Sauvegarder la réclamation
        return reclamationRepository.save(reclamation);
    }


    public void deleteReclamation(Long id) {
        reclamationRepository.deleteById(id);
    }

    // Mise à jour d'une réclamation
    public Reclamation saveReclamation(Reclamation reclamation) {
        // Filtrer la description de la réclamation
        String filteredDescription = filterBadWords(reclamation.getDescription());
        reclamation.setDescription(filteredDescription);

        return reclamationRepository.save(reclamation);
    }
}

