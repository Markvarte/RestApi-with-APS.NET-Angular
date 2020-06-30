import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HousesComponent } from './houses/houses.component';
import { FlatsComponent } from './flats/flats.component';
import { TenantsComponent } from './tenants/tenants.component';

import { HousesService } from './houses.service';
import { FlatsService } from './flats.service';
import { TenantsService } from './tenants.service';
import { AddUpdateHousesComponent } from './add-update-houses/add-update-houses.component';
import { AddUpdateFlatsComponent } from './add-update-flats/add-update-flats.component';
import { AddUpdateTenantsComponent } from './add-update-tenants/add-update-tenants.component';


const appRoutes: Routes = [
{ path: '', component: AppComponent } // это там дублирует 
];
@NgModule({
  declarations: [
    AppComponent,
    HousesComponent, // компоненты тоже очень похожие
    FlatsComponent,
    TenantsComponent,
    AddUpdateHousesComponent,
    AddUpdateFlatsComponent,
    AddUpdateTenantsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule, // не особо нужно ?
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [HousesService, // три одинаковые почти ток url разный
    FlatsService,
    TenantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
