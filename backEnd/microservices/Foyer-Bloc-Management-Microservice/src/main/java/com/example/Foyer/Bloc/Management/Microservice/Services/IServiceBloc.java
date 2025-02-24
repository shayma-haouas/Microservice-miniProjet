package com.example.Foyer.Bloc.Management.Microservice.Services;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Bloc;

import java.util.List;
import java.util.Optional;

public interface IServiceBloc {
    List<Bloc> findAll();



    Bloc addbloc(Bloc bloc);

    void delete(Bloc bloc);

    Bloc update(Bloc bloc);

    Bloc getBlocById(long id);
}
