import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Student-Management-Microservice/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlanningDialogComponent } from './planning-dialog/planning-dialog.component';

import {  ChambreMicroserviceComponent } from './chambre-microservice/chambre-microservice.component';

import { AddEventComponent } from './components/add-event/add-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'auth', component: AuthComponent  },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard]  },
  { path: 'calendar', component: CalendarComponent },           // ✅ Ajouté
  
  { path: 'Room', component: ChambreMicroserviceComponent },    // ✅ Ajouté

  { path: 'planning', component: PlanningDialogComponent },
  { path: 'addevent', component: AddEventComponent },
  { path: 'eventlist', component: EventListComponent }  ,   // ✅ Ajouté

  { path: '**', redirectTo: 'home' }                            // ✅ Route 404 fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
