import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SinginComponent } from './frontend/singin/singin.component';
import { SingupComponent } from './frontend/singup/singup.component';
import { PriceComponent } from './frontend/price/price.component';
import { BlogComponent } from './frontend/blog/blog.component';
import { AboutComponent } from './frontend/about/about.component';
import { TeamComponent } from './frontend/team/team.component';
import { HomeComponent } from './frontend/home/home.component';
import { FeatureComponent } from './frontend/feature/feature.component';
import { TestimonialComponent } from './frontend/testimonial/testimonial.component';
import { CandidatureComponent } from './frontend/candidature/candidature.component';
//import { FormsModule } from '@angular/forms';
import { DocumentsComponent } from './components/documents/documents.component';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Ajoute ceci !

import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './frontend/profile/profile.component';
import { StageComponent } from './frontend/stage/stage.component';
import { ListuserComponent } from './backend/listuser/listuser.component';

@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    SingupComponent,
    PriceComponent,
    BlogComponent,
    AboutComponent,
    TeamComponent,
    HomeComponent,
    FeatureComponent,
    TestimonialComponent,
    CandidatureComponent,
    DocumentsComponent,
    ListuserComponent,
    ProfileComponent,
    StageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // ✅ Centre les notifications
      timeOut: 3000, // Temps d'affichage (optionnel)
      closeButton: true, // Bouton pour fermer (optionnel)
      progressBar: true // Barre de progression (optionnel)
    }),// Configuration globale du Toastr
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }