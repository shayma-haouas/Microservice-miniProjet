import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

import {  ChambreMicroserviceComponent } from './chambre-microservice/chambre-microservice.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventListComponent } from './components/event-list/event-list.component';  // MatFormField
import { ReservationComponent } from './reservation/reservation.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CalendarComponent,

    ChambreMicroserviceComponent,

    AddEventComponent,
    EventListComponent,

    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    FullCalendarModule,
    PlanningDialogComponent,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,

    MatFormFieldModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
