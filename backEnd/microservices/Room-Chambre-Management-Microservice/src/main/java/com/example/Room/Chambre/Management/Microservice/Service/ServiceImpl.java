package com.example.Room.Chambre.Management.Microservice.Service;

import com.example.Room.Chambre.Management.Microservice.Entities.Chambre;
import com.example.Room.Chambre.Management.Microservice.Entities.TypeChambre;
import com.example.Room.Chambre.Management.Microservice.Repository.ChambreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServiceImpl implements Iservice {
      @Autowired
    ChambreRepository chambreRepository;

    //@Scheduled(cron = "0/15 * * * * *")
    // @Scheduled(fixedRate = 10000) // 10000 millisecondes
    //@Scheduled(fixedDelay = 60000)
   // public List<Chambre> retrieveAllChambres() {
     //   List<Chambre> listC = chambreRepository.findAll();
       // log.info("nombre total des chambres : " + listC.size());
        //for (Chambre c: listC) {
          //  log.info("chambre : " + c);
        //}
        //return listC;
    //}
    @Override
    public List<Chambre> getAllChambres() {
        return chambreRepository.findAll();
    }

    public Chambre retrieveChambre(Long chambreId) {
        Chambre c = chambreRepository.findById(chambreId).get();
        return c;
    }

    public Chambre addChambre(Chambre c) {
        Chambre chambre = chambreRepository.save(c);
        return chambre;
    }

    public Chambre modifyChambre(Chambre chambre) {
        Chambre c = chambreRepository.save(chambre);
        return c;
    }

    public void removeChambre(Long chambreId) {
        chambreRepository.deleteById(chambreId);
    }


    //SOME ADVANCED FUNCTIONS
    public List<Chambre> getChambresByTypeChambre(TypeChambre typeChambre) {
        return chambreRepository.findByTypeChambre(typeChambre);
    }


    public List<Chambre> getChambresByNumeroChambreRange(Long startNumero, Long endNumero) {
        return chambreRepository.findByNumeroChambreBetween(startNumero, endNumero);
    }
   // public Chambre trouverchambreSelonEtudiant(String cin) {
     //   return chambreRepository.trouverChselonEt(cin);
    //}
}
