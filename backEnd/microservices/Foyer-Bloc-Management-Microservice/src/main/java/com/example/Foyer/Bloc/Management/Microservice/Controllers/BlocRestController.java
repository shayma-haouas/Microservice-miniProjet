package com.example.Foyer.Bloc.Management.Microservice.Controllers;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Bloc;
import com.example.Foyer.Bloc.Management.Microservice.Services.IServiceBloc;
import com.example.Foyer.Bloc.Management.Microservice.Services.ServiceBloc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bloc")
public class BlocRestController {
    @Autowired
    IServiceBloc blocService;
    @PostMapping("/addbloc")
    public Bloc addBloc(@RequestBody Bloc bloc) {
        blocService.addbloc(bloc);
        return bloc;
    }
    @GetMapping("/retrievebloc")
    public List<Bloc> retrieveAll() {
        return blocService.findAll();
    }

    @GetMapping("/retrievebloc/{idBloc}")
    public Bloc retrieveById(@PathVariable("idBloc") Long id) {
        return blocService.getBlocById(id);
    }


    @PutMapping("/updatebloc")
    public Bloc updateBloc(@RequestBody Bloc bloc) {
        return blocService.update(bloc);
    }
    @DeleteMapping("/deleteBloc/{id}")
    public void deleteBloc(@PathVariable("id") Long id) {
        blocService.delete(blocService.getBlocById(id));
    }

}
