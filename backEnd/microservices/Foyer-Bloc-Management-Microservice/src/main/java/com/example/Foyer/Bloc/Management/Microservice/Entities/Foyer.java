package com.example.Foyer.Bloc.Management.Microservice.Entities;


import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class Foyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long idFoyer;
    String nomFoyer;
    long capaciteFoyer;
    @OneToMany(mappedBy = "foyer",cascade = CascadeType.ALL)
    List<Bloc> blocs;

    public Long getIdFoyer() {
        return idFoyer;
    }

    public void setIdFoyer(Long idFoyer) {
        this.idFoyer = idFoyer;
    }

    public String getNomFoyer() {
        return nomFoyer;
    }

    public void setNomFoyer(String nomFoyer) {
        this.nomFoyer = nomFoyer;
    }

    public long getCapaciteFoyer() {
        return capaciteFoyer;
    }

    public void setCapaciteFoyer(long capaciteFoyer) {
        this.capaciteFoyer = capaciteFoyer;
    }

    public List<Bloc> getBlocs() {
        return blocs;
    }

    public void setBlocs(List<Bloc> blocs) {
        this.blocs = blocs;
    }
}
