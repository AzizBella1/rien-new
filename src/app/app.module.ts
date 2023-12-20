import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './components/test/test.component';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { VillesComponent } from './components/villes/villes.component';
import { EreurComponent } from './components/ereur/ereur.component';
import { ModifierFormComponent } from './components/modifier-form/modifier-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminGestionComponent } from './components/admin-gestion/admin-gestion.component';
import { VilleComponent } from './components/ville/ville.component';
import { ProduitComponent } from './components/produit/produit.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { ProblemeComponent } from './components/probleme/probleme.component';
import { SolutionComponent } from './components/solution/solution.component';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input';


import {MatIconModule} from '@angular/material/icon';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ReferenceComponent } from './components/reference/reference.component';
import { NgChartsModule } from 'ng2-charts';
import { TodoComponent } from './components/todo/todo.component';
import { JournalComponent } from './components/journal/journal.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CheckinComponent } from './components/checkin/checkin.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    TestComponent,
    VillesComponent,
    EreurComponent,
    ModifierFormComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AdminGestionComponent,
    VilleComponent,
    ProduitComponent,
    VehiculeComponent,
    ProblemeComponent,
    SolutionComponent,
    UserComponent,
    DashComponent,
    ReferenceComponent,
    TodoComponent,
    JournalComponent,
    CheckinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    NgChartsModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    FullCalendarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
