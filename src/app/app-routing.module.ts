import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { AddUpdateHousesComponent } from './add-update-houses/add-update-houses.component';


const appRoutes: Routes = [
  {path: 'list', component: HousesComponent},
  {path: 'create', component: AddUpdateHousesComponent},
  {path: 'edit/:id', component: AddUpdateHousesComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
