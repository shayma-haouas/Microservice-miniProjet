import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from './foyer/foyer.component';
import { BlocComponent } from './bloc/bloc.component';
import { AjouterfoyerComponent } from './foyer/crud/ajouterfoyer/ajouterfoyer.component';
import { ModifierfoyerComponent } from './foyer/crud/modifierfoyer/modifierfoyer.component';
import { ModifierblocComponent } from './bloc/crud/modifierbloc/modifierbloc.component';
import { AjouterblocComponent } from './bloc/crud/ajouterbloc/ajouterbloc.component';
const routes: Routes = [ // Default route
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
