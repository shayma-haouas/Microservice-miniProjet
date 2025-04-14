package com.example.Foyer.Bloc.Management.Microservice.Controllers;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Bloc;
import com.example.Foyer.Bloc.Management.Microservice.Entities.Foyer;
import com.example.Foyer.Bloc.Management.Microservice.Services.IServiceFoyer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foyer")
public class FoyerRestController {
    @Autowired
    IServiceFoyer serviceFoyer;
    @PostMapping("/addfoyer")
    public Foyer addfoyer(@RequestBody Foyer foyer) {
        serviceFoyer.addfoyer(foyer);
        return foyer;
    }
    @GetMapping("/retrievefoyer")
    public List<Foyer> retrieveAll() {
        return serviceFoyer.findAll();
    }

    @GetMapping("/retrievefoyer/{idfoyer}")
    public Foyer retrieveById(@PathVariable("idfoyer") Long id) {
        return serviceFoyer.getFoyerById(id);
    }


    @PutMapping("/updatefoyer")
    public Foyer updatefoyer(@RequestBody Foyer foyer) {
        return serviceFoyer.update(foyer);
    }
    @DeleteMapping("/deletefoyer/{id}")
    public void deletefoyer(@PathVariable("id") Long id) {
        serviceFoyer.delete(serviceFoyer.getFoyerById(id));
    }
@PostMapping("/setblocs")
    public void AddBlocToFoyer(@RequestParam Long idFoyer,@RequestParam Long idBloc){
        serviceFoyer.AddBlocToFoyer(idFoyer,idBloc);}
    
}
