import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { AddUpdateHousesComponent } from './add-update-houses/add-update-houses.component';
import { FlatsComponent } from './flats/flats.component';
import { AddUpdateFlatsComponent } from './add-update-flats/add-update-flats.component';


const appRoutes: Routes = [
  {path: 'list', component: HousesComponent},
  {path: 'create', component: AddUpdateHousesComponent},
  {path: 'edit/:id', component: AddUpdateHousesComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'flats/:houseId', component: FlatsComponent},
  {path: 'createFlats/:houseId', component: AddUpdateFlatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
