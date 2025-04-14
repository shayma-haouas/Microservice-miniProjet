import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatureService } from 'src/app/candidature.service';
import { Candidature } from 'src/app/candidature.model';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  candidatures: Candidature[] = [];
  filteredCandidatures: Candidature[] = [];
  newCandidature: Candidature = {
    id: 0,
    studentId: 0,
    internshipOfferId: 0,
    datePostulation: new Date(),
    statut: 'PENDING'
  };

  // Search & Pagination
  searchStatus: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  
  // Sorting
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private candidatureService: CandidatureService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures(): void {
    this.candidatureService.getAllCandidatures().subscribe({
      next: (data: Candidature[]) => {
        this.candidatures = data;
        this.updateFilteredCandidatures();
      },
      error: (error) => console.error('Error loading candidatures:', error)
    });
  }

  updateFilteredCandidatures(): void {
    // Filter first
    const filtered = this.candidatures.filter(c => 
      c.statut.toLowerCase().includes(this.searchStatus.toLowerCase())
    );
    
    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.datePostulation).getTime();
      const dateB = new Date(b.datePostulation).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    // Update pagination
    this.totalItems = sorted.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Apply pagination
    this.filteredCandidatures = sorted.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  sortByDate(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updateFilteredCandidatures();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updateFilteredCandidatures();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateFilteredCandidatures();
    }
  }

  createCandidature(): void {
    this.candidatureService.createCandidature(this.newCandidature).subscribe({
      next: (data: Candidature) => {
        this.candidatures.push(data);
        this.resetForm();
        this.updateFilteredCandidatures();
      },
      error: (error) => console.error('Error creating candidature:', error)
    });
  }

  deleteCandidature(id: number): void {
    if (confirm('Are you sure you want to delete this candidature?')) {
      this.candidatureService.deleteCandidature(id).subscribe({
        next: () => {
          this.candidatures = this.candidatures.filter(c => c.id !== id);
          this.updateFilteredCandidatures();
        },
        error: (error) => console.error('Error deleting candidature:', error)
      });
    }
  }

  goToUploadPage(candidatureId: number): void {
    this.router.navigate([`/documents/${candidatureId}`]);
  }

  private resetForm(): void {
    this.newCandidature = {
      id: 0,
      studentId: 0,
      internshipOfferId: 0,
      datePostulation: new Date(),
      statut: 'PENDING'
    };
  }
}