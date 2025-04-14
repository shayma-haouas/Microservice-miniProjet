import { Component, OnInit } from '@angular/core';
import { ChambreService, Chambre} from '../../services/chambre.service'
@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {
  chambres: Chambre[] = [];
  filteredChambres: Chambre[] = [];
  selectedChambre: Chambre = { idChambre: 0, numeroChambre: 0, typeChambre: '', image: '' };
  searchTerm: string = '';
  isEditMode: boolean = false;

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.loadChambres();
  }

  loadChambres() {
    this.chambreService.getAllChambres().subscribe((data) => {
      this.chambres = data;
      this.filteredChambres = [...this.chambres];
    });
  }

  filterChambres() {
    this.filteredChambres = this.chambres.filter(ch =>
      ch.typeChambre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  saveChambre() {
    if (this.isEditMode) {
      this.chambreService.updateChambre(this.selectedChambre).subscribe(() => {
        this.loadChambres();
        this.resetForm();
      });
    } else {
      this.chambreService.addChambre(this.selectedChambre).subscribe(() => {
        this.loadChambres();
        this.resetForm();
      });
    }
  }

  editChambre(chambre: Chambre) {
    this.selectedChambre = { ...chambre };
    this.isEditMode = true;
  }

  deleteChambre(id: number) {
    if (confirm("Are you sure you want to delete this room?")) {
      this.chambreService.deleteChambre(id).subscribe(() => {
        this.loadChambres();
      });
    }
  }

  resetForm() {
    this.selectedChambre = { idChambre: 0, numeroChambre: 0, typeChambre: '', image: '' };
    this.isEditMode = false;
  }
}