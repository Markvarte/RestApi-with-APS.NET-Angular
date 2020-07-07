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

  // @Output() houseCreated = new EventEmitter<House>(); // react ang sent to autside data when event HouseCreated
  @Input() house: House; // save data in "house"
 // @Input()
  isValidFormSubmitted = false;

  newHouseForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private houseService: HousesService,
   // private route: ActivatedRoute,
  ) {
    this.clearHouses();     // methon to create empty obj
    this.createForm();
  }

  ngOnInit(): void {
    this.isValidFormSubmitted = false; // for form validation
  }
/* 
  public updateForm(data: House) {
 console.log(data);
  } */
  private clearHouses = () => {
    this.house = new DefaultHouse();
  }

 /*  public addUpdateTemporary() { // for testing
    if (this.newHouseForm.valid) {
      this.houseCreated.emit(this.newHouseForm.value);
      this.isValidFormSubmitted = true;
      this.clearHouses();
      this.newHouseForm.reset();
    }
  } */
  public addUpdateHouses() {
    if (this.newHouseForm.valid) {
      if (this.newHouseForm.value.id === undefined) {
         this.addHouse(this.newHouseForm.value); // это нужно было по красивому, но оно не работает
       } else {
        this.updateHouse(this.newHouseForm.value); // это нужно было по красивому, но оно не работает
      }
      this.isValidFormSubmitted = true; // for message "Form submitted successfully."
      this.clearHouses();
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

 /*  onFormSubmit(form: NgForm) { // template-driven form, check if form is valid
    console.log('submitted');
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      console.log('invalid form');
      return;
    }
    this.isValidFormSubmitted = true;
    console.log('not invalid form');
    form.resetForm();
  } */

  private updateHouse(house: House) {
    this.houseService.update(this.newHouseForm.value, 'Houses')
    .subscribe(newHouse => {
      console.log(newHouse); // sent house to base component becouse of houseCreated event
      //this.clearHouses();
    });
  }
  private addHouse(house: House) {
    // Call service to add hosue
    // need to create id
    this.houseService.add(this.newHouseForm.value, "Houses")
    .subscribe(newHouse => {
      console.log(newHouse); // sent house to base component becouse of houseCreated event
     // this.clearHouses();
    });
  }
}
