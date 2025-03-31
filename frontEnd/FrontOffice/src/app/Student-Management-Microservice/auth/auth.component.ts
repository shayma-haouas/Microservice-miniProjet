import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';  // Import du Router

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // Variables pour lier les champs du formulaire d'inscription
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Variables pour la gestion du formulaire de connexion
  signinEmail: string = '';
  signinPassword: string = '';

  // Variable pour déterminer quel formulaire afficher (inscription ou connexion)
  isSignUp: boolean = true;  // Par défaut, afficher le formulaire d'inscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      const container = document.getElementById('container');
      if (container) {
        container.classList.add('sign-in');
      }
    }, 200);
  }

  toggle() {
    this.isSignUp = !this.isSignUp;  // Basculer entre inscription et connexion
    const container = document.getElementById('container');
    if (container) {
      container.classList.toggle('sign-in');
      container.classList.toggle('sign-up');
    }
  }

  // Méthode pour inscrire l'utilisateur
  signup() {
    const userData = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      competences: [],
      role: 'ETUDIANT'
    };
  
    this.authService.signup(userData).subscribe(
      (response) => {
        console.log('Inscription réussie:', response);
  
        // ✅ Appliquer la même transition que "Sign in here"
        this.toggle();
  
        // ✅ Optionnel : redirection si besoin, après un petit délai pour laisser l'effet s'appliquer
        setTimeout(() => {
          this.router.navigate(['/auth']);  // Ou tu peux rester sur place si les deux formulaires sont dans la même page
        }, 500); // Le délai donne le temps pour que la transition s'affiche
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
      }
    );
  }
  

  // Méthode pour connecter l'utilisateur
  signin() {
    const credentials = {
      email: this.signinEmail,
      password: this.signinPassword
    };

    this.authService.signin(credentials).subscribe(
      (response) => {
        console.log('Connexion réussie:', response);
        const token = response.token;
        this.authService.setToken(token);
        // Rediriger l'utilisateur vers une autre page (par exemple, page d'accueil) après la connexion réussie
        this.router.navigate(['/home']);  // Redirection vers la page d'accueil après connexion
      },
      (error) => {
        console.error('Erreur lors de la connexion:', error);
      }
    );
  }
}
