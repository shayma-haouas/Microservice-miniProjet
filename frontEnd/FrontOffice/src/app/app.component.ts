import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public router: Router) {}

  // Méthode pour savoir si on est sur la page d'authentification
  isAuthPage(): boolean {
    const currentUrl = this.router.url;
    return  currentUrl === '/auth'; // adapte selon tes routes
  }
}
