package com.example.Room.Chambre.Management.Microservice.Service;

import com.example.Room.Chambre.Management.Microservice.Entities.Chambre;
import com.example.Room.Chambre.Management.Microservice.Entities.TypeChambre;

import java.util.List;

public interface Iservice {
    //public List<Chambre> retrieveAllChambres();
    List<Chambre> getAllChambres();
    public Chambre retrieveChambre(Long chambreId);
    public Chambre addChambre(Chambre c);
    public void removeChambre(Long chambreId);
    public Chambre modifyChambre(Chambre chambre);
    public List<Chambre> getChambresByTypeChambre(TypeChambre typeChambre);
    public List<Chambre> getChambresByNumeroChambreRange(Long startNumero, Long endNumero);
}
