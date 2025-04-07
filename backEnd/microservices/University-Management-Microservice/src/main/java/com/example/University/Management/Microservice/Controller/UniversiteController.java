package com.example.University.Management.Microservice.Controller;


import com.example.University.Management.Microservice.Entities.Universite;
import com.example.University.Management.Microservice.Entities.UniversiteDTO;
import com.example.University.Management.Microservice.Service.IUniversiteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/universites")
public class UniversiteController {

    private final IUniversiteService universiteService;

    public UniversiteController(IUniversiteService universiteService) {
        this.universiteService = universiteService;
    }

    @PostMapping("/createUniversite")
    public Universite ajouterUniversite(@RequestBody Universite universite) {
        return universiteService.ajouterUniversite(universite);
    }

    @GetMapping("/get")
    public List<Universite> afficherUniversites() {
        return universiteService.afficherUniversites();
    }

    @PutMapping("/update/{id}")
    public Universite modifierUniversite(@PathVariable Long id, @RequestBody Universite universite) {
        return universiteService.modifierUniversite(id, universite);
    }

    @DeleteMapping("/delete/{id}")
    public void supprimerUniversite(@PathVariable Long id) {
        universiteService.supprimerUniversite(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UniversiteDTO> getUniversiteById(@PathVariable Long id) {
        UniversiteDTO universite = universiteService.findById(id);
        if (universite == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(universite);
    }

}