import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Student-Management-Microservice/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlanningDialogComponent } from './planning-dialog/planning-dialog.component';
import { ReservationComponent } from './reservation/reservation.component';
const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },           // ✅ Ajouté
  { path: 'planning', component: PlanningDialogComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },          
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
