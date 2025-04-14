
  

import { ChambreComponent } from './components/chambre/chambre.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from './foyer/foyer.component';
import { BlocComponent } from './bloc/bloc.component';
import { AjouterfoyerComponent } from './foyer/crud/ajouterfoyer/ajouterfoyer.component';
import { ModifierfoyerComponent } from './foyer/crud/modifierfoyer/modifierfoyer.component';
import { ModifierblocComponent } from './bloc/crud/modifierbloc/modifierbloc.component';
import { AjouterblocComponent } from './bloc/crud/ajouterbloc/ajouterbloc.component';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AlreadyAuthGuard } from './guards/already-auth.guard';

const routes: Routes = [
  { path: 'room', component: ChambreComponent },
 
  { path: '', component: HomeComponent,canActivate: [AuthGuard]  }, // Page d'accueil
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent,canActivate:[AlreadyAuthGuard]}, // Page de connexion
  { path: 'register', component: RegisterComponent,canActivate:[AlreadyAuthGuard]}, // Page d'inscription
  { path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}, // Page de profil
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'foyer', component: FoyerComponent },
  { path: 'ajouterfoyer', component: AjouterfoyerComponent },
  { path: 'ajouterbloc', component: AjouterblocComponent },
  {path: 'modifierfoyer/:id', component: ModifierfoyerComponent},
  {path: 'modifierbloc/:id', component: ModifierblocComponent},
  { path: 'blocs', component: BlocComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
