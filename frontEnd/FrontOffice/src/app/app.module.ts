import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FoyerComponent } from './foyer/foyer.component';
import { BlocComponent } from './bloc/bloc.component';
import { AjouterfoyerComponent } from './foyer/crud/ajouterfoyer/ajouterfoyer.component';
import { ModifierfoyerComponent } from './foyer/crud/modifierfoyer/modifierfoyer.component';
import { ModifierblocComponent } from './bloc/crud/modifierbloc/modifierbloc.component';
import { AjouterblocComponent } from './bloc/crud/ajouterbloc/ajouterbloc.component';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Student-Management-Microservice/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PlanningDialogComponent } from './planning-dialog/planning-dialog.component';
import { MatButtonModule } from '@angular/material/button';  // MatButton
import { MatInputModule } from '@angular/material/input';  // MatInput
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReservationComponent } from './reservation/reservation.component';
import {ReclamationComponent } from './components/reclamations/reclamations.component';


import { AddEventComponent } from './components/add-event/add-event.component';
import { EventListComponent } from './components/event-list/event-list.component';  // MatFormField
import { UniversiteModule } from './Universite-Microservice/universite.module';
import { ChambreMicroserviceComponent } from './chambre-microservice/chambre-microservice.component';



@NgModule({
  declarations: [
    AppComponent,
    FoyerComponent,
    BlocComponent,
    AjouterfoyerComponent,
    ModifierfoyerComponent,
    ModifierblocComponent,
    AjouterblocComponent,
    
    AuthComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CalendarComponent,
    ReservationComponent,
    ReclamationComponent,
   

    ChambreMicroserviceComponent,

    AddEventComponent,
    EventListComponent,

    ReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FormsModule, 
    FullCalendarModule,
    PlanningDialogComponent,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    UniversiteModule,
    MatFormFieldModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
