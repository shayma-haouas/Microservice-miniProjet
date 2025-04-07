package com.example.Room.Chambre.Management.Microservice.Controller;

import com.example.Room.Chambre.Management.Microservice.Entities.Chambre;
import com.example.Room.Chambre.Management.Microservice.Service.Iservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/chambre")
public class RestControllerchambre {



    @Autowired
    Iservice chambreService;


    //TEST

    @Value("${welcome.message}")
    private String welcome;

    @GetMapping("/welcome")
    public String getWelcomeMessage() {
        return welcome;
    }
    @GetMapping("/all")
    public List<Chambre> getAllChambres() {
        return chambreService.getAllChambres();
    }



    @GetMapping("/retrieve-chambre/{chambre-id}")
    public Chambre retrieveChambre(@PathVariable("chambre-id") Long chId) {
        Chambre chambre = chambreService.retrieveChambre(chId);
        return chambre;
    }


    @PostMapping("/add-chambre")
    public Chambre addChambre(@RequestBody Chambre c) {
        Chambre chambre = chambreService.addChambre(c);
        return chambre;
    }


    @DeleteMapping("/remove-chambre/{chambre-id}")
    public void removeChambre(@PathVariable("chambre-id") Long chId) {
        chambreService.removeChambre(chId);
    }


    @PutMapping("/modify-chambre")
    public Chambre modifyChambre(@RequestBody Chambre c) {
        Chambre chambre = chambreService.modifyChambre(c);
        return chambre;
    }

}
