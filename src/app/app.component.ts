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
  public currentHouse: House;


  constructor(private houseService: HousesService) { // houses service .. :(
    houseService.get('Houses').subscribe((data: Array<House>) => this.houses = data);
    this.currentHouse = this.getDefaultHouse();
  }
  title = 'Rest API';
  private getDefaultHouse() {
    return new DefaultHouse();
  }

 

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

   public editHouse(record: House) {
    this.currentHouse = record;
  };

   public newHouse(house: House) { // blank
    this.currentHouse = house;
  };
   public deleteHouse(record : House) {
    const deleteIndex = _.findIndex(this.houses, { id: record.id });
    this.houseService.remove(record, "Houses").subscribe(
      () => this.houses.splice(deleteIndex, 1)
    );
  }
  ngOnInit() { }
}
