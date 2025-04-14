package com.example.Reclamation.Response.Management.Microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReponseService {

    @Autowired
    private ReponseRepository reponseRepository;

    @Autowired
    private ReclamationRepository reclamationRepository;

   // @Autowired
    //private EmailService emailService; // Injecter le service d'e-mail

    // Ajouter une réponse à une réclamation existante
// Ajouter une réponse à une réclamation existante
    public Reponse createReponse(Long reclamationId, Reponse reponse) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId)
                .orElseThrow(() -> new RuntimeException("Réclamation non trouvée"));

        if (reponseRepository.findByReclamation_IdRec(reclamationId).isPresent()) {
            throw new RuntimeException("Une réponse existe déjà pour cette réclamation");
        }

        reponse.setReclamation(reclamation);
        Reponse savedReponse = reponseRepository.save(reponse);


        return savedReponse;
    }


    // Récupérer une réponse par ID
    public Reponse getReponseById(Long id) {
        return reponseRepository.findById(id).orElse(null);
    }

    // Récupérer la réponse d'une réclamation spécifique
    public Reponse getReponseByReclamationId(Long reclamationId) {
        return reponseRepository.findByReclamation_IdRec(reclamationId).orElse(null);
    }

    // Récupérer toutes les réponses
    public List<Reponse> getAllReponses() {
        return reponseRepository.findAll();
    }

    // Modifier une réponse
    public Reponse updateReponse(Long id, Reponse reponseDetails) {
        Reponse reponse = reponseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réponse non trouvée"));

        reponse.setMessage(reponseDetails.getMessage());
        return reponseRepository.save(reponse);
    }

    // Supprimer une réponse
    public void deleteReponse(Long id) {
        reponseRepository.deleteById(id);
    }
}

