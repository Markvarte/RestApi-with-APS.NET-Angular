import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule, NG_VALIDATORS, Validator } from '@angular/forms';
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
import { AddReactiveHouseComponent } from './add-reactive-house/add-reactive-house.component';
import { CommonModule } from '@angular/common';
import { NumberValidator } from './numberValidator/number.validator';

@NgModule({
   declarations: [
      AppComponent,
      HousesComponent,
      TenantsComponent,
      FlatsComponent,
      AddUpdateHousesComponent,
      AddUpdateFlatsComponent,
      AddUpdateTenantsComponent,
      AddReactiveHouseComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      HousesService,
      FlatsService,
      TenantsService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
