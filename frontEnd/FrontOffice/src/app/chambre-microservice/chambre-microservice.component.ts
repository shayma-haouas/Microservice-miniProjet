import { Component, OnInit } from '@angular/core';
import { ChambreService, Chambre} from '../Services/chambre.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-chambre-microservice',
  templateUrl: './chambre-microservice.component.html',
  styleUrls: ['./chambre-microservice.component.css']
})
export class ChambreMicroserviceComponent implements OnInit {

    chambres: Chambre[] = [];
  
    constructor(private chambreService: ChambreService) {}
  
    ngOnInit(): void {
      this.chambreService.getAllChambres().subscribe(data => {
        this.chambres = data;
      });
    }
}
