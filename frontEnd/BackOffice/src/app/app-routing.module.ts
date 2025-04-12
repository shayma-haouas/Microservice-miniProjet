import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './components/chambre/chambre.component';
const routes: Routes = [
  { path: '', component: ChambreComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirection vers Home en cas d'erreur
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
