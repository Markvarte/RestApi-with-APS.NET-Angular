import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { House, DefaultHouse } from '../houses/house';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NumberValidator } from '../numberValidator/number.validator';
import { HousesService } from '../houses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-houses',
  templateUrl: './add-update-houses.component.html',
  styleUrls: ['./add-update-houses.component.css']
})
export class AddUpdateHousesComponent implements OnInit {

  @Input() house: House; // save data in "house"
  isValidFormSubmitted = false;

  newHouseForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private houseService: HousesService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    this.clearHouses();     // methon to create empty obj
    this.createForm();
  }

  ngOnInit(): void {
    this.isValidFormSubmitted = false; // for form validation
    this.route.params.subscribe(param => {
      const houseId = param.id;
      if (houseId) { // if ID exist => edit, if not => create
        this.getHouseInfo(houseId); // TODO: If params contains ID then request house info by ID
      } else {
        // this._router.navigate(['list']);
        // Otherwise return back to house list
      }

      // this.houseService.getHouseById(param.id);
    });
  }
  /*
    public updateForm(data: House) {
   console.log(data);
    } */
  private clearHouses = () => {
    this.house = new DefaultHouse();
  }
  public addUpdateHouses() {
    if (this.newHouseForm.valid) {
      if (!this.newHouseForm.value.id) {
        this.addHouse(this.newHouseForm.value); // это нужно было по красивому, но оно не работает
      } else {
        this.updateHouse(this.newHouseForm.value); // это нужно было по красивому, но оно не работает
      }
      this.isValidFormSubmitted = true; // for message "Form submitted successfully."
      this.clearHouses();
      this.newHouseForm.reset();
    }
  }


  private getHouseInfo(houseId: number) {
    this.houseService.getById(houseId)
      .subscribe(house => {
        console.log(house);
        this.editHouse(house);
        // TODO: Update values on form -->
      //  this.house = house; // ?
      });
  }

  editHouse(house: House) { // set value to form
    this.newHouseForm.patchValue(house); // <-- TODO: Update values on form // patch becouse of field "flat", wich don't exist in angular
  }
  private createForm() {
    this.newHouseForm = this.formBuilder.group({
      id: [null],
      num: [null, [Validators.required, NumberValidator.validateNumbers] ],
      street: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')] ],
      sity: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'),  Validators.minLength(3)] ],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'),  Validators.minLength(3)] ],
      postCode: ['', [Validators.required,  Validators.minLength(4)] ],
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
        console.log(newHouse);
        //this.clearHouses();
      });
  }
  private addHouse(house: House) {
    // Call service to add hosue
    // need to create id
    this.houseService.add(this.newHouseForm.value, 'Houses')
      .subscribe(newHouse => {
        console.log(newHouse); // instead there can be err log
        // this.clearHouses();
      });
  }
}
