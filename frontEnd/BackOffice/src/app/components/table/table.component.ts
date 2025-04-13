import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from 'src/app/services/stage.service';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users: any[] = [];
  stages: any[] = [];
  reservations: Reservation[] = [];
  sortByStatusOrder: 'asc' | 'desc' = 'asc';
  sortByDateOrder: 'asc' | 'desc' = 'asc';

  // Pie Chart Configuration
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: { 
          font: { size: 14 },
          usePointStyle: true
        }
      },
      title: { 
        display: true,
        text: 'Répartition des Statuts des Réservations (%)',
        font: { size: 16 },
        align: 'center'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    }
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['En attente', 'Accepté', 'Refusé'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#FFA07A', '#98FB98', '#FFB6C1'],
      hoverBackgroundColor: ['#FF7F50', '#90EE90', '#FF69B4']
    }]
  };

  constructor(
    private userService: UserService,
    private stageService: StageService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadUsers();
    this.loadStages();
    this.loadReservations();
  }

  // ========================= USER METHODS =========================
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map(user => ({
          ...user,
          is_verified: user.verified ? 'Vérifié' : 'Non vérifié',
          is_accepted: user.accepted ? 'Accepté' : 'Non accepté'
        }));
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  acceptUser(userId: number): void {
    this.userService.acceptUser(userId).subscribe({
      next: () => this.updateUserStatus(userId, true),
      error: (err) => console.error('Accept error:', err)
    });
  }

  blockUser(userId: number): void {
    this.userService.blockUser(userId).subscribe({
      next: () => this.updateUserStatus(userId, false),
      error: (err) => console.error('Block error:', err)
    });
  }

  private updateUserStatus(userId: number, isAccepted: boolean): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.is_accepted = isAccepted ? 'Accepté' : 'Non accepté';
    }
  }

  // ========================= STAGE METHODS =========================
  loadStages(): void {
    this.stageService.getStages().subscribe({
      next: (stages) => this.stages = stages,
      error: (err) => console.error('Error loading stages:', err)
    });
  }

  viewStageFile(stageId: number): void {
    this.stageService.getStageFile(stageId).subscribe({
      next: (fileBlob) => window.open(URL.createObjectURL(fileBlob)),
      error: (err) => console.error('File view error:', err)
    });
  }

  editStage(id: number): void {
    this.router.navigate(['/edit-stage', id]);
  }

  deleteStage(id: number): void {
    if (confirm('Confirmer la suppression du stage?')) {
      this.stageService.deleteStage(id).subscribe({
        next: () => this.stages = this.stages.filter(s => s.id !== id),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  // ========================= RESERVATION METHODS =========================
  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data.map(res => ({
          ...res,
          statut: this.validateStatus(res.statut),
          dateReservation: res.dateReservation ? new Date(res.dateReservation) : null
        }));
        this.updateChartData();
      },
      error: (err) => console.error('Error loading reservations:', err)
    });
  }

  private validateStatus(status: any): ReservationStatus {
    const validStatuses: ReservationStatus[] = ['En attente', 'Accepté', 'Refusé'];
    return validStatuses.includes(status) ? status : 'En attente';
  }

  updateStatus(id: number, newStatus: string): void {
    const status = this.validateStatus(newStatus);
    if (confirm('Confirmer le changement de statut?')) {
      this.reservationService.updateStatus(id, status).subscribe({
        next: (updatedRes) => {
          const index = this.reservations.findIndex(r => r.id === id);
          if (index > -1) {
            this.reservations[index].statut = status;
            this.updateChartData();
          }
        },
        error: (err) => console.error('Update error:', err)
      });
    }
  }

  deleteReservation(id: number): void {
    if (confirm('Confirmer la suppression?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r.id !== id);
          this.updateChartData();
        },
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  sortByStatus(): void {
    this.sortByStatusOrder = this.sortByStatusOrder === 'asc' ? 'desc' : 'asc';
    const order = this.sortByStatusOrder === 'asc' ? 1 : -1;
    
    this.reservations = [...this.reservations].sort((a, b) => {
      const statusOrder = ['En attente', 'Accepté', 'Refusé'];
      return order * (statusOrder.indexOf(a.statut) - statusOrder.indexOf(b.statut));
    });
  }

  sortByDate(): void {
    this.sortByDateOrder = this.sortByDateOrder === 'asc' ? 'desc' : 'asc';
    const order = this.sortByDateOrder === 'asc' ? 1 : -1;
    
    this.reservations = [...this.reservations].sort((a, b) => {
      const dateA = a.dateReservation?.getTime() || 0;
      const dateB = b.dateReservation?.getTime() || 0;
      return order * (dateA - dateB);
    });
  }

  private updateChartData(): void {
    const counts = {
      'En attente': 0,
      'Accepté': 0,
      'Refusé': 0
    };

    this.reservations.forEach(res => counts[res.statut]++);
    const total = this.reservations.length;

    this.pieChartData.datasets[0].data = total > 0 ? [
      (counts['En attente'] / total * 100),
      (counts['Accepté'] / total * 100),
      (counts['Refusé'] / total * 100)
    ] : [0, 0, 0];

    this.pieChartData = {...this.pieChartData};
  }
}