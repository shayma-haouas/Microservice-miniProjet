package com.example.Foyer.Bloc.Management.Microservice.Services;

import com.example.Foyer.Bloc.Management.Microservice.Entities.Bloc;
import com.example.Foyer.Bloc.Management.Microservice.Repositories.BlocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceBloc implements IServiceBloc {
    @Autowired
    BlocRepository blocRepository;
    @Override
    public List<Bloc> findAll() {
        return blocRepository.findAll();
    }



    @Override
    public Bloc addbloc(Bloc bloc) {
        return blocRepository.save(bloc);
    }

    @Override
    public void delete(Bloc bloc) {
        blocRepository.delete(bloc);
    }

    @Override
    public Bloc update(Bloc bloc) {
        blocRepository.save(bloc);
        return bloc;
    }

    @Override
    public Bloc getBlocById(long id) {
        blocRepository.findById(id);
        return blocRepository.findById(id).get();
    }

}
