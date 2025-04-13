import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AlreadyAuthGuard } from './guards/already-auth.guard';
import { ReclamationsComponent} from './components/reclamations/reclamations.component';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [AuthGuard]  }, // Page d'accueil
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent,canActivate:[AlreadyAuthGuard]}, // Page de connexion
  { path: 'register', component: RegisterComponent,canActivate:[AlreadyAuthGuard]}, // Page d'inscription
  { path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}, // Page de profil
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'reclamation', component: ReclamationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
