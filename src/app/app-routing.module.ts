import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './components/test/test.component';
import { VillesComponent } from './components/villes/villes.component';
import { EreurComponent } from './components/ereur/ereur.component';
import { ModifierFormComponent } from './components/modifier-form/modifier-form.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { VilleComponent } from './components/ville/ville.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { ProduitComponent } from './components/produit/produit.component';
import { ProblemeComponent } from './components/probleme/probleme.component';
import { SolutionComponent } from './components/solution/solution.component';
import { UserComponent } from './components/user/user.component';
import { DashComponent } from './dash/dash.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { TodoComponent } from './components/todo/todo.component';
import { JournalComponent } from './components/journal/journal.component';
import { CheckinComponent } from './components/checkin/checkin.component';


const routes: Routes = [
  { path:'' ,component:LoginComponent},
  { path:'dashboard' ,component:DashComponent},
  { path:'acceuil' ,component:AdminHomeComponent},
  { path:'gestion/user' ,component:UserComponent},
  { path:'gestion/ville' ,component:VilleComponent},
  { path:'gestion/vehicule' ,component:VehiculeComponent},
  { path:'gestion/produit' ,component:ProduitComponent},
  { path:'gestion/probleme' ,component:ProblemeComponent},
  { path:'gestion/solution' ,component:SolutionComponent},
  { path:'gestion/ref' ,component:ReferenceComponent},
  { path:'forms' ,component:FormComponent},
  { path:'journal' ,component:JournalComponent},
  //{ path:'ville' ,component:VillesComponent},
  { path:'home' ,component:TestComponent},
  { path:'todo' ,component:TodoComponent},
  { path:'er' ,component:EreurComponent},
  { path:'check' ,component:CheckinComponent},
  { path:'mod/:form' ,component:ModifierFormComponent},
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
   },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
