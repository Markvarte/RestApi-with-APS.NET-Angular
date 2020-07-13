import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { AddUpdateHousesComponent } from './add-update-houses/add-update-houses.component';
import { FlatsComponent } from './flats/flats.component';
import { AddUpdateFlatsComponent } from './add-update-flats/add-update-flats.component';
import { DeleteFlatsComponent } from './delete-flats/delete-flats.component';


const appRoutes: Routes = [
  {path: 'list', component: HousesComponent},
  {path: 'create', component: AddUpdateHousesComponent},
  {path: 'edit/:id', component: AddUpdateHousesComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'flats/:houseId', component: FlatsComponent},
  {path: 'createFlats/:houseId', component: AddUpdateFlatsComponent},
  {path: 'editFlats/:id/:houseId', component: AddUpdateFlatsComponent},
  {path: 'deleteFlats/:id/:houseId', component: DeleteFlatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
