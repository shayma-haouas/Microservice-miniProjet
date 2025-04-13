import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoyerComponent } from './foyer/foyer.component';
import { BlocComponent } from './bloc/bloc.component';
import { AjouterfoyerComponent } from './foyer/crud/ajouterfoyer/ajouterfoyer.component';
import { ModifierfoyerComponent } from './foyer/crud/modifierfoyer/modifierfoyer.component';
import { ModifierblocComponent } from './bloc/crud/modifierbloc/modifierbloc.component';
import { AjouterblocComponent } from './bloc/crud/ajouterbloc/ajouterbloc.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FoyerComponent,
    BlocComponent,
    AjouterfoyerComponent,
    ModifierfoyerComponent,
    ModifierblocComponent,
    AjouterblocComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
