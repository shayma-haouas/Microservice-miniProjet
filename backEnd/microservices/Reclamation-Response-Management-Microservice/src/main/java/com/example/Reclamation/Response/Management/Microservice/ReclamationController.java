package com.example.Reclamation.Response.Management.Microservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reclamations")
@CrossOrigin(origins = {"*"
})
public class ReclamationController {

    @Autowired
    private ReclamationService reclamationService;

    // Get all Reclamations
    @GetMapping("get")
    public List<Reclamation> getAllReclamations() {
        return reclamationService.getAllReclamations();
    }

    // Get Reclamation by ID
    @GetMapping("/{id}")
    public Reclamation getReclamationById(@PathVariable Long id) {
        return reclamationService.getReclamationById(id);
    }

    // Create new Reclamation
    @PostMapping("post")
    public Reclamation createReclamation(@RequestBody Reclamation reclamation) {
        return reclamationService.createReclamation(reclamation);
    }

    // Update Reclamation


    // Delete Reclamation
    @DeleteMapping("/{id}")
    public void deleteReclamation(@PathVariable Long id) {
        reclamationService.deleteReclamation(id);
    }

    // Mise à jour d'une réclamation
    @PutMapping("update/{id}")
    public Reclamation updateReclamation(@PathVariable Long id, @RequestBody Reclamation reclamation) {
        reclamation.setIdRec(id);
        return reclamationService.saveReclamation(reclamation);
    }


}
