import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: any[] = [];
  paginatedDocuments: any[] = [];
  selectedFile: File | null = null;
  fileError: boolean = false;
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  documentsPerPage: number = 5;
  candidatureId: number | null = null;

  constructor(
    private documentsService: DocumentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.candidatureId = Number(this.route.snapshot.paramMap.get('candidatureId'));
    
    if (this.candidatureId) {
      this.loadDocuments();
    } else {
      console.error('Invalid candidature ID');
      this.fileError = true;
    }
  }

  loadDocuments(): void {
    if (this.candidatureId) {
      this.documentsService.getDocumentsByCandidature(this.candidatureId).subscribe({
        next: (data: any[]) => {
          this.documents = data;
          this.totalPages = Math.ceil(this.documents.length / this.documentsPerPage);
          this.updatePaginatedDocuments();
        },
        error: (error: any) => {
          console.error("Error loading documents", error);
          this.fileError = true;
        }
      });
    }
  }

  updatePaginatedDocuments(): void {
    const filteredDocuments = this.documents.filter(doc => 
      doc.fileName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.documentsPerPage;
    this.paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + this.documentsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedDocuments();
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.updatePaginatedDocuments();
  }

  onFileSelected(event: any): void {
    this.fileError = false;
    if (event.target.files?.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile || !this.candidatureId) {
      this.fileError = true;
      return;
    }

    this.documentsService.uploadDocument(this.candidatureId, this.selectedFile).subscribe({
      next: (response) => {
        console.log("Upload successful", response);
        this.selectedFile = null;
        this.loadDocuments();
      },
      error: (error) => {
        console.error("Upload error", error);
        this.fileError = true;
      }
    });
  }

  download(id: number): void {
    this.documentsService.downloadDocument(id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document_${id}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => console.error("Download error", error)
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentsService.deleteDocument(id).subscribe({
        next: () => {
          console.log(`Document ${id} deleted`);
          this.loadDocuments();
        },
        error: (error) => console.error("Delete error", error)
      });
    }
  }
}