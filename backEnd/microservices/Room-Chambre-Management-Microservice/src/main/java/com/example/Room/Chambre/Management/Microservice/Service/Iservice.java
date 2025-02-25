package com.example.Room.Chambre.Management.Microservice.Service;

import com.example.Room.Chambre.Management.Microservice.Entities.Chambre;

import java.util.List;

public interface Iservice {
    //public List<Chambre> retrieveAllChambres();
    List<Chambre> getAllChambres();
    public Chambre retrieveChambre(Long chambreId);
    public Chambre addChambre(Chambre c);
    public void removeChambre(Long chambreId);
    public Chambre modifyChambre(Chambre chambre);
}
