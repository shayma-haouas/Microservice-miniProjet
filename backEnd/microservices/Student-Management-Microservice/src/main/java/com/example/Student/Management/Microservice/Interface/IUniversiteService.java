package com.example.Student.Management.Microservice.Interface;

import com.example.Student.Management.Microservice.Entities.Universite;

import java.util.List;

public interface IUniversiteService {

    Universite createUniversite(Universite universite);

    Universite updateUniversite(Long id, Universite updatedUniversite);

    void deleteUniversite(Long id);

    Universite getUniversiteById(Long id);

    List<Universite> getAllUniversites();


}