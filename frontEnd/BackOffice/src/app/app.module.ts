import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChambreComponent } from './components/chambre/chambre.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';
import { NgChartsModule } from 'ng2-charts';
import { ReclamationsComponent } from './components/reclamations/reclamations.component';
import { ReponseComponent } from './components/reponse/reponse.component';
import { MatDialogModule } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    ProfileComponent,
    ReclamationsComponent,
    ReponseComponent,
    ChambreComponent

    
  ],
 
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center', // Centrer le popup
      timeOut: 3000, // Disparaît après 3 secondes
      progressBar: true, // Affiche une barre de progression
      closeButton: true, // Ajoute un bouton de fermeture
      preventDuplicates: true, // Évite les messages en double
    }),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
