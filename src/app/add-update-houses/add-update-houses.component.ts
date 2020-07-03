import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { House, DefaultHouse } from '../houses/house';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NumberValidator } from '../numberValidator/number.validator';
import { HousesService } from '../houses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-houses',
  templateUrl: './add-update-houses.component.html',
  styleUrls: ['./add-update-houses.component.css']
})
export class AddUpdateHousesComponent implements OnInit {

  @Output() houseCreated = new EventEmitter<House>(); // react ang sent to autside data when event HouseCreated
  @Input() house: House; // save data in "house"
  isValidFormSubmitted = false;

  newHouseForm: FormGroup;
  constructor(
    // this.clearHouses(), // methon to create empty obj
    private formBuilder: FormBuilder,
    private houseService: HousesService,
    private route: ActivatedRoute,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isValidFormSubmitted = false; // for form validation
  }

  private clearHouses = () => {
    this.house = new DefaultHouse();
  }

  public addUpdateHouses() {
    if (this.newHouseForm.valid) {
      if (this.newHouseForm.value.id === undefined) {
      //this.houseCreated.emit(this.newHouseForm.value);
        this.addHouse(this.newHouseForm.value); //это нужно было по красивому, но оно не работает
       } else {
        this.updateHouse(this.newHouseForm.value); //это нужно было по красивому, но оно не работает
      }
      this.isValidFormSubmitted = true; // for message "Form submitted successfully."
      // all types are interface types "House"
      //  this.houseCreated.emit(this.house); // sent house to base component becouse of houseCreated event
      // this.clearHouses();
      this.newHouseForm.reset();
    }
  }



  private createForm() {
    this.newHouseForm = this.formBuilder.group({
      num: [null, [Validators.required, NumberValidator.validateNumbers]],
      street: ['', Validators.required],
      sity: ['', Validators.required],
      country: ['', Validators.required],
      postCode: ['', Validators.required],
    });
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

  private updateHouse(house: House) {
    this.houseService.update(this.newHouseForm.value, 'Houses')
    .subscribe(newHouse => {
      this.houseCreated.emit(newHouse); // sent house to base component becouse of houseCreated event
      this.clearHouses();
    });
  }
  private addHouse(house: House) {
    // Call service to add hosue
    // need to create id
    this.houseService.add(this.newHouseForm.value, 'Houses')
    .subscribe(newHouse => {
      this.houseCreated.emit(newHouse); // sent house to base component becouse of houseCreated event
      this.clearHouses();
    });
  }
}
