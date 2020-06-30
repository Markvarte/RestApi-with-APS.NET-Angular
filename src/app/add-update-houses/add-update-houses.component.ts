import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { House, DefaultHouse } from '../houses/house';

@Component({
  selector: 'app-add-update-houses',
  templateUrl: './add-update-houses.component.html',
  styleUrls: ['./add-update-houses.component.css']
})
export class AddUpdateHousesComponent implements OnInit {

  @Output() houseCreated = new EventEmitter<House>(); // react ang sent to autside data when event HouseCreated
  @Input() house: House; // save data in "house"
  constructor() {
    this.clearHouses(); // methon to create empty obj
  }

  ngOnInit(): void {
  }

  private clearHouses = () => {
    this.house = new DefaultHouse();
  };
  public addUpdateHouses(event : House) { // all types are interface types "House"
    this.houseCreated.emit(this.house); // sent house to base component becouse of houseCreated event
    this.clearHouses();
  };
}
