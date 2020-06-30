import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { House, DefaultHouse } from './houses/house';
import { HousesService } from './houses.service';
import { Flat, DefaultFlat } from './flats/flat';
import { Tenant, DefaultTenant } from './tenants/tenant';
import { FlatsService } from './flats.service';
import { TenantsService } from './tenants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public houses: Array<House>;
  public flats: Array<Flat>;
  public tenants: Array<Tenant>;
  public currentHouse: House;
  public currentFlat: Flat;
  public currentTenant: Tenant;

  constructor(private houseService: HousesService, private flatService: FlatsService, private tenantService: TenantsService) { // houses service .. :(
    houseService.get("Houses").subscribe((data: Array<House>) => this.houses = data);
    this.currentHouse = this.getDefaultHouse();
    flatService.get().subscribe((data: Array<Flat>) => this.flats = data);
    this.currentFlat = this.getDefaultFlat();
    tenantService.get().subscribe((data: Array<Tenant>) => this.tenants = data);
    this.currentTenant = this.getDefaultTenant();
  }
  title = 'Rest API';
  private getDefaultHouse() {
    return new DefaultHouse();
  }
  private getDefaultFlat() {
    return new DefaultFlat();
  }
  private getDefaultTenant() {
    return new DefaultTenant();
  }
  public createUpdateTenant(tenant: Tenant) {
    let tenantWithId = _.find(this.tenants, (el => el.id === tenant.id));
    if (tenantWithId) {
      const updateIndex = _.findIndex(this.tenants, { id: tenantWithId.id });
      this.houseService.update(tenant, "Tenants").subscribe(() => {
         this.tenants.splice(updateIndex, 1, tenant)
      });
    } else {
      tenant.id = this.tenants[this.tenants.length - 1].id + 1; // solution for Internal server error
      this.tenantService.add(tenant).subscribe(
        () => {
          //house.id = record.id;
           this.tenants.push(tenant);
        }
      );
    }
    this.currentTenant = this.getDefaultTenant();
  };

  public createUpdateFlat(flat: Flat) {
    let flatWithId = _.find(this.flats, (el => el.id === flat.id));
    if (flatWithId) {
      const updateIndex = _.findIndex(this.flats, { id: flatWithId.id });
      this.flatService.update(flat).subscribe(() => {
        this.flats.splice(updateIndex, 1, flat);
      }
      );
    } else {
      flat.id = this.flats[this.flats.length - 1].id + 1; // solution for Internal server error
      this.flatService.add(flat).subscribe(
        () => {
          //house.id = record.id;
          this.flats.push(flat)
        }
      );
    }
    this.currentFlat = this.getDefaultFlat();
  };

  public createUpdateHouse(house: House) {
    let houseWithId = _.find(this.houses, (el => el.id === house.id));
    if (houseWithId) {
      const updateIndex = _.findIndex(this.houses, { id: houseWithId.id });
      this.houseService.update(house, "Houses").subscribe(() => {
        this.houses.splice(updateIndex, 1, house);
      }      
      );
    } else {
      house.id = this.houses[this.houses.length - 1].id + 1; // solution for Internal server error
      this.houseService.add(house, "Houses").subscribe(
        () => {
          //house.id = record.id;
          this.houses.push(house)
        }
      );
    }
    this.currentHouse = this.getDefaultHouse();
  };

  public editFlat(record: Flat) {
    this.currentFlat = record;
  };

  public editHouse(record: House) {
    this.currentHouse = record;
  };

  public editTenant(record: Tenant) {
    this.currentTenant = record;
  };

  public newFlat(flat: Flat) { // blank
    this.currentFlat = flat;
  };
  public newHouse(house: House) { // blank
    this.currentHouse = house;
  };
  public newTenant(house: Tenant) { // blank
    this.currentTenant = house;
  };
  public deleteTenant(record) {
    const deleteIndex = _.findIndex(this.tenants, { id: record.id });
    this.houseService.remove(record, "Tenants").subscribe(
      () => this.tenants.splice(deleteIndex, 1)
    );
  }

  public deleteFlat(record: Flat) {
    const deleteIndex = _.findIndex(this.flats, { id: record.id });
    this.houseService.remove(record, "Flats").subscribe(
      () => this.flats.splice(deleteIndex, 1)
    );
  }
  public deleteHouse(record) {
    const deleteIndex = _.findIndex(this.houses, { id: record.id });
    this.houseService.remove(record, "Houses").subscribe(
      () => this.houses.splice(deleteIndex, 1)
    );
  }
  ngOnInit() { }
}
