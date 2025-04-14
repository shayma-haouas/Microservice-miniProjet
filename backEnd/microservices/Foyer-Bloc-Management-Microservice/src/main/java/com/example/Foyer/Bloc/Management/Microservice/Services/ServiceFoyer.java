package com.example.Foyer.Bloc.Management.Microservice.Services;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Bloc;
import com.example.Foyer.Bloc.Management.Microservice.Entities.Foyer;
import com.example.Foyer.Bloc.Management.Microservice.Repositories.BlocRepository;
import com.example.Foyer.Bloc.Management.Microservice.Repositories.FoyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceFoyer implements IServiceFoyer {
    @Autowired
    FoyerRepository foyerRepository;
    @Autowired
    BlocRepository blocRepository;
    @Override
    public List<Foyer> findAll() {
        return foyerRepository.findAll();
    }

    @Override
    public Foyer GetFoyer(Long id) {
        return foyerRepository.findById(id).get();
    }

    @Override
    public Foyer getFoyerById(long id) {
        foyerRepository.findById(id);
        return foyerRepository.findById(id).get();
    }
    @Override
    public Foyer addfoyer(Foyer foyer) {
        return foyerRepository.save(foyer);
    }

    @Override
    public void delete(Foyer foyer) {
        foyerRepository.delete(foyer);
    }

    @Override
    public Foyer update(Foyer foyer) {
        foyerRepository.save(foyer);
        return foyer;
    }
    @Override
    public void AddBlocToFoyer(Long foyerId, Long blocId) {


        Foyer foyer = foyerRepository.findById(foyerId).get();

        Bloc bloc = blocRepository.findById(blocId).get();
        if (foyer.getBlocs().stream().count()==foyer.getCapaciteFoyer()){
            System.out.println("Foyer est plein !");


        }else{foyer.getBlocs().add(bloc);
            bloc.setFoyer(foyer);

            foyerRepository.save(foyer);}

    }

}
