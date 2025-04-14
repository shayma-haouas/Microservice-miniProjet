import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: { nom: string, prenom: string, email: string, role: string } | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  // Méthode pour rediriger vers le profil de l'utilisateur
  goToProfile() {
    if (this.currentUser) {
      console.log('Redirection vers /profile');
      this.router.navigate(['/profile']);
    }
  }
  goToSignup() {
    this.router.navigate(['/signin']);
  }

}
