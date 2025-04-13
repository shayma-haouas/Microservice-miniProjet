import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {} // ✅ Injecte ToastrService

  signin() {
    if (!this.email || !this.password) {
      this.toastr.error('Veuillez remplir tous les champs.', 'Erreur ❌', {
        positionClass: 'toast-top-center'
      });
      return;  // Ne pas envoyer la requête si les champs sont vides
    }

    const user = { email: this.email, password: this.password };

    this.authService.signin(user).subscribe({
      next: (response: any) => {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));

        const userNom = payload.nom;
        const userPrenom = payload.prenom;
        const userEmail = payload.sub;
        const userRole = payload.role;

        this.authService.saveToken(token, userNom, userPrenom, userEmail, userRole);
        console.log('Token reçu:', token);

        this.toastr.success(`Bienvenue, ${userPrenom} ${userNom} !`, 'Connexion réussie ✅', {
          positionClass: 'toast-top-center'
        });

        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur de connexion:', err);

        let errorMessage = 'Erreur de connexion. Veuillez vérifier vos identifiants.';

        if (err.status === 403) {
          // Affichage du message en tant qu'avertissement
          errorMessage = "Votre compte n'a pas encore été vérifié. Veuillez vérifier votre email.";
          this.toastr.warning(errorMessage, 'Avertissement ⚠️', {
            positionClass: 'toast-top-center'
          });
        } else if (err.status === 400) {
          if (typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.error && err.error.message) {
            errorMessage = err.error.message;
          }
        } else if (err.status >= 500) {
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
        } else if (err.status === 0) {
          errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        }

        this.errorMessage = errorMessage;

        // Si l'erreur est une autre, afficher avec le style d'erreur classique
        if (err.status !== 403) {
          this.toastr.error(errorMessage, 'Erreur ❌', {
            positionClass: 'toast-top-center'
          });
        }
      }
    });
  }

}
