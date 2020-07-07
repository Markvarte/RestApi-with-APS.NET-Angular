import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { House, DefaultHouse } from './house';
import { HousesService } from '../houses.service';
import * as _ from 'lodash';
import { AddUpdateHousesComponent } from '../add-update-houses/add-update-houses.component';


@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  @Input() houses: Array<House>;
  public currentHouse: House;
   constructor(private houseService: HousesService) { // don't sure it is necessary
     houseService.get("Houses").subscribe((data: Array<House>) => this.houses = data); // take array from server
     this.currentHouse = this.getDefaultHouse();
    }

 // @Output() recordDeleted = new EventEmitter<House>(); // sent when click on delete ?
  @Output() newClicked = new EventEmitter<House>(); // sent when click on new ?
  @Output() editClicked = new EventEmitter<House>(); // sent when click on edit ?
  showFlats: number = null; // initial value
 
  private getDefaultHouse() {
    return new DefaultHouse();
  }
 //  public createUpdateHouse(house: House) {
 /*    let houseWithId = _.find(this.houses, (el => el.id === house.id));
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
    this.currentHouse = this.getDefaultHouse(); */
  // }

  public deleteH(data: House) {
    const deleteIndex = _.findIndex(this.houses, { id: data.id });
    this.houseService.remove(data, "Houses").subscribe(
      () => this.houses.splice(deleteIndex, 1)
    );
  }
/*   public editH(data: House) {

   console.log("Something happend ? ");
   console.log("Data empty ? " + data.country); // no data not empty and function works
   //this.editClicked.emit(data); // was Object.assign({}, data)

  } */
  public newH(data: House) { // new is blank for now
    this.newClicked.emit(data);
  }

  public getConnectedFlats(data: number) {
    this.showFlats = data;

  }

 // getHouses(): void {
  //  this.houseService.get().subscribe((houses : House) => this.housesValues = houses);
  // }
  // addhouse(name: string): void {
 //   name = name.trim();
 // if (!name) { return; }
 // this.houseService.add({name} ).subscribe(h => {
 //   this.housesValues = h;
 // })
 // }

  ngOnInit() {
   // this.getHouses();
    //  this._httpService.get(this.accessPointUrl).subscribe(val => { // json returns from server
    //    this.housesValues = val.json();
    //  });


    this.houseService.get("Houses").subscribe((data: Array<House>) => this.houses = data); // take array from server
    this.currentHouse = this.getDefaultHouse();
    }
}
