import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { House, DefaultHouse } from '../houses/house';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-update-houses',
  templateUrl: './add-update-houses.component.html',
  styleUrls: ['./add-update-houses.component.css']
})
export class AddUpdateHousesComponent implements OnInit {

  @Output() houseCreated = new EventEmitter<House>(); // react ang sent to autside data when event HouseCreated
  @Input() house: House; // save data in "house"
  isValidFormSubmitted = false; // for form validation
  constructor() {
    this.clearHouses(); // methon to create empty obj
  }

  ngOnInit(): void {
  }

  private clearHouses = () => {
    this.house = new DefaultHouse();
  }

  public addUpdateHouses(form: NgForm) {
    if (form.valid) {
      this.addHouse(form.value);
      this.isValidFormSubmitted = true;
      // all types are interface types "House"
      this.houseCreated.emit(this.house); // sent house to base component becouse of houseCreated event
      this.clearHouses();
    }
  }

  onFormSubmit(form: NgForm) { // template-driven form, check if form is valid
    console.log('submitted');
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      console.log('invalid form');
      return;
    }
    this.isValidFormSubmitted = true;
    console.log('not invalid form');
    form.resetForm();
  }

  private addHouse(house: House) {
    // Call service to add hosue
    of<House>()
      .subscribe(newHouse => {
        this.houseCreated.emit(newHouse); // sent house to base component becouse of houseCreated event
        this.clearHouses();
      });
  }
}
