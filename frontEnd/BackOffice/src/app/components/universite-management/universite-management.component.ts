import { Component, OnInit } from '@angular/core';
import { Universite, UniversiteService } from 'src/app/services/universite.service';

@Component({
  selector: 'app-universite-management',
  templateUrl: './universite-management.component.html',
  styleUrls: ['./universite-management.component.css']
})
export class UniversiteManagementComponent implements OnInit {
  universites: Universite[] = [];
  universite: Universite = { nomUniversite: '', adresse: '' };

  constructor(private universiteService: UniversiteService) {}

  ngOnInit() {
    this.loadUniversites();
  }

  loadUniversites() {
    this.universiteService.getAll().subscribe(data => this.universites = data);
  }

  save() {
    if (this.universite.idUniversite) {
      this.universiteService.update(this.universite.idUniversite, this.universite).subscribe(() => {
        this.loadUniversites();
        this.universite = { nomUniversite: '', adresse: '' };
      });
    } else {
      this.universiteService.create(this.universite).subscribe(() => {
        this.loadUniversites();
        this.universite = { nomUniversite: '', adresse: '' };
      });
    }
  }

  edit(u: Universite) {
    this.universite = { ...u };
  }

  delete(id: number) {
    this.universiteService.delete(id).subscribe(() => this.loadUniversites());
  }
}
