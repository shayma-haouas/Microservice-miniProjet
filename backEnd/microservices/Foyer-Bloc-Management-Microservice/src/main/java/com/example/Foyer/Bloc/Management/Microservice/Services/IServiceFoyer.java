package com.example.Foyer.Bloc.Management.Microservice.Services;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Bloc;
import com.example.Foyer.Bloc.Management.Microservice.Entities.Foyer;

import java.util.List;

public interface IServiceFoyer {
    List<Foyer> findAll();

    Foyer GetFoyer(Long id);

    Foyer getFoyerById(long id);

    Foyer addfoyer(Foyer foyer);

    void delete(Foyer foyer);

    Foyer update(Foyer foyer);


    void AddBlocToFoyer(Long foyerId, Long blocId);
}
