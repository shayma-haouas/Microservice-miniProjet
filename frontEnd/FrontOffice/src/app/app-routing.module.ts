

import { AuthComponent } from './Student-Management-Microservice/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PlanningDialogComponent } from './planning-dialog/planning-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from './foyer/foyer.component';
import { BlocComponent } from './bloc/bloc.component';
import { AjouterfoyerComponent } from './foyer/crud/ajouterfoyer/ajouterfoyer.component';
import { ModifierfoyerComponent } from './foyer/crud/modifierfoyer/modifierfoyer.component';
import { ModifierblocComponent } from './bloc/crud/modifierbloc/modifierbloc.component';
import { AjouterblocComponent } from './bloc/crud/ajouterbloc/ajouterbloc.component';

import { ReservationComponent } from './reservation/reservation.component';
import { ReclamationComponent} from './components/reclamations/reclamations.component';
import { ChambreMicroserviceComponent } from './chambre-microservice/chambre-microservice.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { UniversiteService } from './Services/universite.service';
import { UniversiteComponent } from './Universite-Microservice/universite.component';


const routes: Routes = [
  { path: 'reclamation', component: ReclamationComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },           // ✅ Ajouté
  { path: 'foyer', component: FoyerComponent },
  { path: 'ajouterfoyer', component: AjouterfoyerComponent },
  { path: 'ajouterbloc', component: AjouterblocComponent },
  {path: 'modifierfoyer/:id', component: ModifierfoyerComponent},
  {path: 'modifierbloc/:id', component: ModifierblocComponent},
  { path: 'blocs', component: BlocComponent },
  { path: 'planning', component: PlanningDialogComponent },
  { path: 'reservation', component: ReservationComponent },


  { path: 'home', component: HomeComponent  },
  
  { path: 'room', component: ChambreMicroserviceComponent },    // ✅ Ajouté

  { path: 'addevent', component: AddEventComponent },
  { path: 'eventlist', component: EventListComponent }  ,   // ✅ Ajouté

{ path: 'universites', component: UniversiteComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
