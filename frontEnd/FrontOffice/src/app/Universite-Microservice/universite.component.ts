import { Component, OnInit } from '@angular/core';
import { Universite } from './universite.model';
import { UniversiteService } from '../Services/universite.service';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit {
  universites: Universite[] = [];
  universite: Universite = { nomUniversite: '', adresse: '' };

  constructor(private service: UniversiteService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.universites = data);
  }

  save() {
    if (this.universite.idUniversite) {
      this.service.update(this.universite.idUniversite, this.universite).subscribe(() => this.reset());
    } else {
      this.service.create(this.universite).subscribe(() => this.reset());
    }
  }

  edit(u: Universite) {
    this.universite = { ...u };
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.universite = { nomUniversite: '', adresse: '' };
    this.load();
  }
}
