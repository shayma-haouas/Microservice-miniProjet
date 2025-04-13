import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signin({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));

        this.authService.saveToken(
          token,
          payload.nom,
          payload.prenom,
          payload.sub,
          payload.role
        );

        this.router.navigate(['/']); // ou dashboard selon ton routing
      },
      error: (err) => {
        console.error(err);
        alert('Échec de la connexion. Vérifiez vos identifiants.');
      }
    });
  }
}
