import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Student-Management-Microservice/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlanningDialogComponent } from './planning-dialog/planning-dialog.component';
import {  ChambreMicroserviceComponent } from './chambre-microservice/chambre-microservice.component';
const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },           // ✅ Ajouté
  { path: 'planning', component: PlanningDialogComponent },  
  { path: 'Room', component: ChambreMicroserviceComponent },    // ✅ Ajouté
  { path: '', redirectTo: 'home', pathMatch: 'full' },          // ✅ Redirection par défaut
  { path: '**', redirectTo: 'home' }                            // ✅ Route 404 fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
