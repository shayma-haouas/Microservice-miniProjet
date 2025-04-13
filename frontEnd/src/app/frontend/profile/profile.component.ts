import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any; // Stocke les données du profil

  constructor(private userService: UserService,private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error("Erreur lors du chargement du profil:", error);
      }
    );
  }

  logout(): void {
    // Appeler la méthode logout du service
    this.authService.logout();

    // Afficher un message de succès pour l'utilisateur
    this.toastr.success('Vous êtes maintenant déconnecté.', 'Déconnexion réussie ✅', {
      positionClass: 'toast-top-center'
    });

    // Rediriger vers la page de connexion (par exemple : /signin)
    this.router.navigate(['/signin']);
  }

}
